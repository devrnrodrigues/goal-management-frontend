import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { ToastType, ToastItem, ToastContextValue } from './toast.types';
import {
  ToastContainerWrapper,
  ToastCard,
  ToastIconBox,
  ToastMessage,
  ToastCloseBtn,
} from './Toast.styles';

const ToastContext = createContext<ToastContextValue | null>(null);

export const appToast = {
  show: (type: ToastType, message: string, duration = 3500) => {
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { type, message, duration },
      })
    );
  },
  success: (message: string, duration = 3500) => {
    appToast.show('success', message, duration);
  },
  error: (message: string, duration = 4000) => {
    appToast.show('error', message, duration);
  },
  info: (message: string, duration = 3500) => {
    appToast.show('info', message, duration);
  },
  warning: (message: string, duration = 3500) => {
    appToast.show('warning', message, duration);
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 3500) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newItem: ToastItem = { id, type, message, duration };

      setToasts((prev) => [...prev, newItem]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  const success = useCallback((message: string, duration?: number) => showToast('success', message, duration), [showToast]);
  const error = useCallback((message: string, duration?: number) => showToast('error', message, duration || 4000), [showToast]);
  const info = useCallback((message: string, duration?: number) => showToast('info', message, duration), [showToast]);
  const warning = useCallback((message: string, duration?: number) => showToast('warning', message, duration), [showToast]);

  useEffect(() => {
    const handleCustomToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: ToastType; message: string; duration?: number }>;
      if (customEvent.detail) {
        showToast(customEvent.detail.type, customEvent.detail.message, customEvent.detail.duration);
      }
    };

    window.addEventListener('app-toast', handleCustomToast);
    return () => {
      window.removeEventListener('app-toast', handleCustomToast);
    };
  }, [showToast]);

  const renderIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning, dismiss }}>
      {children}
      <ToastContainerWrapper>
        <AnimatePresence>
          {toasts.map((item) => (
            <ToastCard
              key={item.id}
              $type={item.type}
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              layout
            >
              <ToastIconBox $type={item.type}>
                {renderIcon(item.type)}
              </ToastIconBox>
              <ToastMessage>{item.message}</ToastMessage>
              <ToastCloseBtn type="button" onClick={() => dismiss(item.id)} aria-label="Fechar">
                <X size={15} />
              </ToastCloseBtn>
            </ToastCard>
          ))}
        </AnimatePresence>
      </ToastContainerWrapper>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: appToast.show,
      success: appToast.success,
      error: appToast.error,
      info: appToast.info,
      warning: appToast.warning,
      dismiss: () => undefined,
    };
  }
  return context;
};

