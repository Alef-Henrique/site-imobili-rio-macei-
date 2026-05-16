export const premiumMenuProps = {
  PaperProps: {
    className: 'premium-scrollbar glass-dropdown shadow-2xl',
    sx: {
      mt: 1,
      maxHeight: 320, // Increased as requested (250-320px)
      overflow: 'hidden',
      borderRadius: '1.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.95) !important',
      backdropFilter: 'blur(30px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
      width: 'var(--mui-select-width)',
      '& .MuiList-root': {
        p: 1.5,
        maxHeight: 320,
        overflowY: 'auto',
      },
      '& .MuiMenuItem-root': {
        px: 2.5,
        py: 1.5,
        borderRadius: '1rem',
        mx: 0.5,
        my: 0.5,
        fontSize: '0.875rem',
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        color: '#1e293b',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:hover': {
          backgroundColor: 'rgba(14, 165, 233, 0.08)',
          color: '#0ea5e9',
          transform: 'translateX(6px)',
          boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)',
        },
        '&.Mui-selected': {
          backgroundColor: '#0ea5e9',
          color: '#fff',
          boxShadow: '0 8px 20px -4px rgba(14, 165, 233, 0.4)',
          '&:hover': {
            backgroundColor: '#0284c7',
            transform: 'translateX(6px)',
          }
        },
        '& .MuiTouchRipple-root': {
          color: 'rgba(14, 165, 233, 0.2)',
        }
      }
    }
  },
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const,
  },
  transformOrigin: {
    vertical: 'top' as const,
    horizontal: 'left' as const,
  },
  disableScrollLock: true,
};
