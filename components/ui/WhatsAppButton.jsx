'use client'

import React, { useState, useEffect } from 'react'

/**
 * Botón flotante de WhatsApp para LITESCO
 */

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // ⚙️ CONFIGURACIÓN
  const WHATSAPP_NUMBER = "+573132037572";
  const LOGO_URL = "/logo.webp";

  // Ocultar tooltip al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowTooltip(false);
      } else {
        setShowTooltip(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      id: 'corporativo',
      title: 'Corporativo',
      subtitle: 'Servicios empresariales',
      message: 'Hola, me interesa información sobre servicios corporativos',
      gradient: 'linear-gradient(135deg, #1a1a4e, #2d2d7a)',
      icon: '🏢'
    },
    {
      id: 'litis',
      title: 'Litis',
      subtitle: 'Asesoría en litigios',
      message: 'Hola, necesito asesoría en temas de litigio',
      gradient: 'linear-gradient(135deg, #8B7355, #D4AF37)',
      icon: '⚖️'
    },
    {
      id: 'recuperacion',
      title: 'Recuperación',
      subtitle: 'Recuperación de cartera',
      message: 'Hola, me interesa información sobre recuperación de cartera',
      gradient: 'linear-gradient(135deg, #2E8B57, #3CB371)',
      icon: '💰'
    },
    {
      id: 'agendar',
      title: 'Agendar Reunión',
      subtitle: 'Programa una cita',
      message: 'Hola, me gustaría agendar una reunión',
      gradient: 'linear-gradient(135deg, #4169E1, #6495ED)',
      icon: '📅'
    }
  ];

  const handleCategoryClick = (message) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const styles = {
    container: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    menu: {
      position: 'absolute',
      bottom: '80px',
      right: '0',
      width: '320px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      overflow: 'hidden',
    },
    header: {
      background: 'linear-gradient(135deg, #1a1a4e 0%, #0f0f2d 100%)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      borderBottom: '3px solid #D4AF37',
    },
    logoContainer: {
      width: '55px',
      height: '55px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #D4AF37',
      flexShrink: 0,
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    headerText: {
      flex: 1,
    },
    headerTitle: {
      color: '#D4AF37',
      fontSize: '18px',
      fontWeight: '700',
      margin: '0 0 4px 0',
      letterSpacing: '0.5px',
    },
    headerSubtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '12px',
      margin: 0,
    },
    onlineIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#25D366',
      fontSize: '12px',
      marginTop: '4px',
    },
    onlineDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#25D366',
      borderRadius: '50%',
      animation: 'pulse 2s infinite',
    },
    menuContent: {
      padding: '12px',
      backgroundColor: '#f0f2f5',
    },
    welcomeMessage: {
      backgroundColor: '#fff',
      padding: '12px 16px',
      borderRadius: '0 12px 12px 12px',
      marginBottom: '16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    welcomeText: {
      color: '#1a1a2e',
      fontSize: '14px',
      margin: 0,
      lineHeight: '1.5',
    },
    messageTime: {
      color: '#667781',
      fontSize: '11px',
      textAlign: 'right',
      marginTop: '4px',
    },
    categoriesLabel: {
      color: '#667781',
      fontSize: '12px',
      fontWeight: '600',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 14px',
      backgroundColor: '#fff',
      borderRadius: '12px',
      marginBottom: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid transparent',
    },
    menuIcon: {
      width: '44px',
      height: '44px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      flexShrink: 0,
    },
    menuTextContainer: {
      flex: 1,
    },
    menuTitle: {
      color: '#1a1a2e',
      fontSize: '15px',
      fontWeight: '600',
      margin: '0 0 2px 0',
    },
    menuSubtitle: {
      color: '#667781',
      fontSize: '12px',
      margin: 0,
    },
    menuArrow: {
      color: '#D4AF37',
      fontSize: '18px',
    },
    mainButton: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: isOpen 
        ? 'linear-gradient(135deg, #1a1a4e, #0f0f2d)' 
        : 'linear-gradient(135deg, #25D366, #128C7E)',
      border: isOpen ? '3px solid #D4AF37' : 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: isOpen 
        ? '0 6px 30px rgba(212, 175, 55, 0.4)' 
        : '0 6px 30px rgba(37, 211, 102, 0.4)',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    whatsappIcon: {
      width: '32px',
      height: '32px',
      fill: 'white',
      transition: 'all 0.3s ease',
      opacity: isOpen ? 0 : 1,
      transform: isOpen ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
    },
    closeIcon: {
      position: 'absolute',
      width: '24px',
      height: '24px',
      fill: '#D4AF37',
      transition: 'all 0.3s ease',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
    },
    tooltip: {
      position: 'absolute',
      right: '76px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#1a1a4e',
      color: '#D4AF37',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      opacity: (isOpen || !showTooltip) ? 0 : 1,
      visibility: (isOpen || !showTooltip) ? 'hidden' : 'visible',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
    tooltipArrow: {
      position: 'absolute',
      right: '-8px',
      top: '50%',
      transform: 'translateY(-50%)',
      borderWidth: '8px',
      borderStyle: 'solid',
      borderColor: 'transparent transparent transparent #1a1a4e',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.menu}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <img src={LOGO_URL} alt="LITESCO" style={styles.logo} />
          </div>
          <div style={styles.headerText}>
            <h3 style={styles.headerTitle}>LITESCO</h3>
            <p style={styles.headerSubtitle}>Litigio Estratégico Colombiano</p>
            <div style={styles.onlineIndicator}>
              <span style={styles.onlineDot}></span>
              <span>En línea</span>
            </div>
          </div>
        </div>

        <div style={styles.menuContent}>
          <div style={styles.welcomeMessage}>
            <p style={styles.welcomeText}>
              👋 ¡Hola! Bienvenido a LITESCO.<br/>
              ¿En qué podemos ayudarte hoy?
            </p>
            <div style={styles.messageTime}>Ahora</div>
          </div>

          <div style={styles.categoriesLabel}>Selecciona una opción:</div>

          {categories.map((category) => (
            <div
              key={category.id}
              style={styles.menuItem}
              onClick={() => handleCategoryClick(category.message)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{...styles.menuIcon, background: category.gradient}}>
                {category.icon}
              </div>
              <div style={styles.menuTextContainer}>
                <h4 style={styles.menuTitle}>{category.title}</h4>
                <p style={styles.menuSubtitle}>{category.subtitle}</p>
              </div>
              <span style={styles.menuArrow}>›</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.tooltip}>
        ¡Contáctanos por WhatsApp!
        <div style={styles.tooltipArrow}></div>
      </div>

      <button
        style={styles.mainButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de WhatsApp'}
      >
        <svg style={styles.whatsappIcon} viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <svg style={styles.closeIcon} viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppButton;