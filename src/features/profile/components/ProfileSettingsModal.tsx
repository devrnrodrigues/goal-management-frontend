import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Sliders, Sun, Moon, Laptop, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { useProfileSettings } from '../useProfileSettings';
import { getInitials } from '../../shared/utils/avatarUtils';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  HeaderTitleCol,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  TabNavRow,
  TabButton,
  ModalForm,
  ModalBody,
  AvatarSection,
  AvatarPreview,
  AvatarInitialsBox,
  AvatarInfoCol,
  AvatarTitle,
  AvatarHelper,
  FormGroup,
  Label,
  Input,
  SectionDivider,
  SubSectionTitle,
  ProviderBadge,
  PreferencesCard,
  PreferenceItem,
  PreferenceTextCol,
  PreferenceLabel,
  PreferenceDescription,
  SwitchToggle,
  ThemeOptionsGroup,
  ThemeOptionButton,
  Banner,
  ModalFooter,
  CancelButton,
  SaveButton,
} from '../styles/ProfileSettingsModal.styles';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
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
    isSaving,
    errorMessage,
    successMessage,
    handleSubmit,
  } = useProfileSettings(isOpen, onClose);

  const [avatarLoadError, setAvatarLoadError] = useState(false);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [avatarUrl]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderTitleCol>
            <ModalTitle>Configurações da Conta</ModalTitle>
            <ModalSubtitle>Gerencie seu perfil e personalize sua experiência</ModalSubtitle>
          </HeaderTitleCol>
          <CloseButton type="button" onClick={onClose} aria-label="Fechar">
            <X size={16} />
          </CloseButton>
        </ModalHeader>

        <TabNavRow>
          <TabButton
            type="button"
            $isActive={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            <User size={15} />
            <span>Perfil</span>
          </TabButton>
          <TabButton
            type="button"
            $isActive={activeTab === 'preferences'}
            onClick={() => setActiveTab('preferences')}
          >
            <Sliders size={15} />
            <span>Preferências</span>
          </TabButton>
        </TabNavRow>

        <ModalForm onSubmit={handleSubmit}>
          <ModalBody>
            {errorMessage && (
              <Banner $type="error">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </Banner>
            )}

            {successMessage && (
              <Banner $type="success">
                <Check size={16} />
                <span>{successMessage}</span>
              </Banner>
            )}

            {activeTab === 'profile' && (
              <>
                <AvatarSection>
                  {avatarUrl.trim() && !avatarLoadError ? (
                    <AvatarPreview
                      src={avatarUrl}
                      alt={name || 'Avatar'}
                      onError={() => setAvatarLoadError(true)}
                    />
                  ) : (
                    <AvatarInitialsBox>{getInitials(name || 'Usuário')}</AvatarInitialsBox>
                  )}
                  <AvatarInfoCol>
                    <AvatarTitle>Foto de Perfil</AvatarTitle>
                    <AvatarHelper>
                      Informe a URL direta de uma imagem para atualizar sua foto.
                    </AvatarHelper>
                  </AvatarInfoCol>
                </AvatarSection>

                <FormGroup>
                  <Label htmlFor="avatar-url-input">URL do Avatar</Label>
                  <Input
                    id="avatar-url-input"
                    type="url"
                    placeholder="https://exemplo.com/sua-foto.jpg"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="name-input">Nome Completo</Label>
                  <Input
                    id="name-input"
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email-input">E-mail</Label>
                  <Input
                    id="email-input"
                    type="email"
                    disabled
                    value={email}
                  />
                  <ProviderBadge>
                    <ShieldCheck size={13} />
                    <span>Conta vinculada via {provider === 'GOOGLE' ? 'Google' : 'E-mail / Senha'}</span>
                  </ProviderBadge>
                </FormGroup>

                {provider === 'LOCAL' && (
                  <>
                    <SectionDivider />
                    <SubSectionTitle>Alterar Senha</SubSectionTitle>

                    <FormGroup>
                      <Label htmlFor="curr-pass">Senha Atual</Label>
                      <Input
                        id="curr-pass"
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="new-pass">Nova Senha</Label>
                      <Input
                        id="new-pass"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="confirm-pass">Confirmar Nova Senha</Label>
                      <Input
                        id="confirm-pass"
                        type="password"
                        placeholder="Repita a nova senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormGroup>
                  </>
                )}
              </>
            )}

            {activeTab === 'preferences' && (
              <>
                <FormGroup>
                  <Label>Tema da Interface</Label>
                  <ThemeOptionsGroup>
                    <ThemeOptionButton
                      type="button"
                      $isSelected={theme === 'LIGHT'}
                      onClick={() => setTheme('LIGHT')}
                    >
                      <Sun size={15} />
                      <span>Claro</span>
                    </ThemeOptionButton>
                    <ThemeOptionButton
                      type="button"
                      $isSelected={theme === 'DARK'}
                      onClick={() => setTheme('DARK')}
                    >
                      <Moon size={15} />
                      <span>Escuro</span>
                    </ThemeOptionButton>
                    <ThemeOptionButton
                      type="button"
                      $isSelected={theme === 'SYSTEM'}
                      onClick={() => setTheme('SYSTEM')}
                    >
                      <Laptop size={15} />
                      <span>Sistema</span>
                    </ThemeOptionButton>
                  </ThemeOptionsGroup>
                </FormGroup>

                <SectionDivider />

                <SubSectionTitle>Notificações e Resumos</SubSectionTitle>

                <PreferencesCard>
                  <PreferenceItem>
                    <PreferenceTextCol>
                      <PreferenceLabel>Notificações por e-mail</PreferenceLabel>
                      <PreferenceDescription>
                        Receber alertas de tarefas e prazos que requerem sua atenção.
                      </PreferenceDescription>
                    </PreferenceTextCol>
                    <SwitchToggle
                      type="button"
                      role="switch"
                      aria-checked={emailNotifications}
                      $checked={emailNotifications}
                      onClick={() => setEmailNotifications((prev) => !prev)}
                    />
                  </PreferenceItem>

                  <PreferenceItem>
                    <PreferenceTextCol>
                      <PreferenceLabel>Resumo semanal de metas</PreferenceLabel>
                      <PreferenceDescription>
                        Receber relatório consolidado de entregas toda segunda-feira.
                      </PreferenceDescription>
                    </PreferenceTextCol>
                    <SwitchToggle
                      type="button"
                      role="switch"
                      aria-checked={weeklySummary}
                      $checked={weeklySummary}
                      onClick={() => setWeeklySummary((prev) => !prev)}
                    />
                  </PreferenceItem>
                </PreferencesCard>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose} disabled={isSaving}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar alterações'}
            </SaveButton>
          </ModalFooter>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

