import { useState, useEffect, useCallback } from 'react';
import { profileApi } from './api/profileApi';
import type { ProfileThemePreference } from './types';
import { getStoredUser, updateStoredUser, useDevMode } from '../shared';

export const useProfileSettings = (isOpen: boolean, onClose: () => void) => {
  const { isMock } = useDevMode();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [provider, setProvider] = useState<'LOCAL' | 'GOOGLE'>('LOCAL');

  const [theme, setTheme] = useState<ProfileThemePreference>('LIGHT');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const stored = getStoredUser();
    if (stored) {
      setName(stored.name || '');
      setEmail(stored.email || '');
      setAvatarUrl(stored.avatarUrl || '');
      setProvider(stored.provider || 'LOCAL');
    }

    if (!isMock) {
      try {
        const remoteProfile = await profileApi.getProfile();
        setName(remoteProfile.name || '');
        setEmail(remoteProfile.email || '');
        setAvatarUrl(remoteProfile.avatarUrl || '');
        setProvider(remoteProfile.provider || 'LOCAL');
        setTheme(remoteProfile.theme || 'LIGHT');
        setEmailNotifications(remoteProfile.emailNotifications ?? true);
        setWeeklySummary(remoteProfile.weeklySummary ?? true);
      } catch {
        if (!stored) {
          setErrorMessage('Não foi possível carregar os dados do perfil.');
        }
      }
    }

    setIsLoading(false);
  }, [isMock]);

  useEffect(() => {
    if (isOpen) {
      loadUserData();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [isOpen, loadUserData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setErrorMessage('O nome é obrigatório.');
      return;
    }

    if (newPassword.trim()) {
      if (provider !== 'LOCAL') {
        setErrorMessage('Contas vinculadas ao Google não possuem senha direta.');
        return;
      }
      if (!currentPassword) {
        setErrorMessage('Informe sua senha atual para alterar para uma nova.');
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage('A nova senha deve ter no mínimo 6 caracteres.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('A confirmação da nova senha não confere.');
        return;
      }
    }

    setIsSaving(true);

    try {
      if (isMock) {
        updateStoredUser({
          name: name.trim(),
          avatarUrl: avatarUrl.trim() || undefined,
        });
        setSuccessMessage('Perfil e preferências atualizados com sucesso!');
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        const payload = {
          name: name.trim(),
          avatarUrl: avatarUrl.trim() || undefined,
          theme,
          emailNotifications,
          weeklySummary,
          currentPassword: currentPassword ? currentPassword : undefined,
          newPassword: newPassword.trim() ? newPassword.trim() : undefined,
        };

        const updated = await profileApi.updateProfile(payload);
        updateStoredUser({
          name: updated.name,
          avatarUrl: updated.avatarUrl,
        });

        setSuccessMessage('Perfil e preferências atualizados com sucesso!');
        setTimeout(() => {
          onClose();
        }, 800);
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      setErrorMessage(
        errorObj?.message || 'Erro ao salvar alterações no perfil. Tente novamente.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    name,
    setName,
    email,
    avatarUrl,
    setAvatarUrl,
    provider,
    theme,
    setTheme,
    emailNotifications,
    setEmailNotifications,
    weeklySummary,
    setWeeklySummary,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    isSaving,
    errorMessage,
    successMessage,
    handleSubmit,
  };
};

