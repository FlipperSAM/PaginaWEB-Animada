// 🎭 Selección de elementos
const shapes = document.querySelectorAll('.shape, .shape-rect-thin');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const togglePwd = document.getElementById('togglePwd');
const eyeOpen = document.getElementById('eyeOpen');
const eyeClosed = document.getElementById('eyeClosed');
const loginForm = document.getElementById('loginForm');

// 🎯 Animación de aparición al cargar
window.addEventListener('load', () => {
  shapes.forEach((shape, index) => {
    setTimeout(() => {
      shape.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      shape.style.opacity = '1';
      shape.style.transform = 'scale(1) translateY(0)';
    }, index * 150);

    // Activar parpadeo continuo en los ojos
    const eyes = shape.querySelectorAll('.eye');
    eyes.forEach(eye => {
      eye.classList.add('blinking');
    });
  });
});

// 👀 Ojos siguen el cursor
document.addEventListener('mousemove', (e) => {
  shapes.forEach(shape => {
    const eyesContainer = shape.querySelector('.eyes');
    if (!eyesContainer) return;

    const rect = eyesContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    const distance = Math.max(Math.sqrt(offsetX ** 2 + offsetY ** 2), 1);
    const maxMove = 6;

    const moveX = (offsetX / distance) * maxMove;
    const moveY = (offsetY / distance) * maxMove;

    const eyeL = eyesContainer.querySelector('.eye.left');
    const eyeR = eyesContainer.querySelector('.eye.right');

    if (eyeL) eyeL.style.transform = `translate(${moveX}px, ${moveY}px)`;
    if (eyeR) eyeR.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// 📧 Email input = inclinación izquierda
emailInput.addEventListener('focus', () => {
  shapes.forEach(shape => {
    shape.style.transform += ' rotate(-8deg)';
  });
});
emailInput.addEventListener('blur', () => {
  shapes.forEach(shape => {
    shape.style.transform = shape.style.transform.replace(' rotate(-8deg)', '');
  });
});

// 🔒 Password input = inclinación derecha
pwdInput.addEventListener('focus', () => {
  shapes.forEach(shape => {
    shape.style.transform += ' rotate(8deg)';
  });
});
pwdInput.addEventListener('blur', () => {
  shapes.forEach(shape => {
    shape.style.transform = shape.style.transform.replace(' rotate(8deg)', '');
  });
});

// 👁️ Toggle ver/ocultar contraseña
togglePwd.addEventListener('click', () => {
  const isHidden = pwdInput.type === 'password';
  pwdInput.type = isHidden ? 'text' : 'password';
  eyeOpen.style.display = isHidden ? 'none' : 'inline';
  eyeClosed.style.display = isHidden ? 'inline' : 'none';

  shapes.forEach(shape => {
    shape.style.transition = 'transform 0.6s ease';
    const mouth = shape.querySelector('.mouth');

    if (isHidden) {
      // Mostrar contraseña → girar + boca ._.
      shape.style.transform += ' rotateY(180deg)';
      if (mouth) {
        mouth.classList.remove('smile');
        mouth.classList.add('dot-neutral');
      }
    } else {
      // Ocultar contraseña → volver + boca sonriente
      shape.style.transform = shape.style.transform.replace(' rotateY(180deg)', '');
      if (mouth) {
        mouth.classList.remove('dot-neutral');
        mouth.classList.add('smile');
        setTimeout(() => mouth.classList.remove('smile'), 1000);
      }
    }

    // Movimiento sutil
    shape.style.transform += ' translateY(-6px)';
    setTimeout(() => {
      shape.style.transform = shape.style.transform.replace(' translateY(-6px)', '');
    }, 300);
  });
});

// 🧪 Validación al enviar formulario
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pwdVal = pwdInput.value;

  if (pwdVal.length < 6) {
    shapes.forEach(shape => {
      shape.style.transition = 'transform 0.3s ease';
      shape.style.transform += ' translateX(-10px)';
      setTimeout(() => {
        shape.style.transform = shape.style.transform.replace(' translateX(-10px)', ' translateX(10px)');
        setTimeout(() => {
          shape.style.transform = shape.style.transform.replace(' translateX(10px)', '');
        }, 150);
      }, 150);
    });

    alert('La contraseña es demasiado corta');
  } else {
    document.body.classList.add('success-bg');
    document.querySelector('.login-box').classList.add('fade-out');

    shapes.forEach(shape => {
      shape.style.transition = 'transform 0.4s ease';
      shape.style.transform += ' translateY(-20px)';
      setTimeout(() => {
        shape.style.transform = shape.style.transform.replace(' translateY(-20px)', '');
      }, 400);
    });

    setTimeout(() => {
      alert('Login exitoso (demo)');
      document.body.classList.remove('success-bg');
      document.querySelector('.login-box').classList.remove('fade-out');
    }, 1000);
  }
});