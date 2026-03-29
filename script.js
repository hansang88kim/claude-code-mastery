// ========================
// 1. 햄버거 메뉴 토글
// ========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = mobileMenu.querySelectorAll('a');

// 햄버거 버튼 클릭 시 메뉴 토글
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// 메뉴 링크 클릭 시 메뉴 닫기
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ========================
// 2. 스무스 스크롤 및 스크롤 감지
// ========================
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

// 스크롤 감지하여 navbar 스타일 변경
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;

  if (scrollTop > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollTop = scrollTop;
});

// 모든 nav 링크에 스무스 스크롤 적용
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // 유효한 섹션 ID인지 확인
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();

      // 스무스 스크롤 (CSS scroll-behavior: smooth 사용)
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================
// 3. 스크롤 리빌 애니메이션 (IntersectionObserver)
// ========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 섹션이 뷰포트에 들어오면 애니메이션 클래스 추가
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      // 카드들도 애니메이션 추가
      const cards = entry.target.querySelectorAll('.bg-white[class*="rounded"], .bg-gray-50[class*="rounded"]');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.transition = 'all 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });

      // 관찰 중지
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 모든 섹션에 observer 적용
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '1';
  section.style.transform = 'translateY(0)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// ========================
// 4. Contact 폼 검증 및 처리
// ========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// 이메일 검증 함수
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 폼 제출 처리
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 입력값 가져오기
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // 검증
  let isValid = true;
  let errorMessage = '';

  if (!name) {
    isValid = false;
    errorMessage = '이름을 입력해주세요.';
  }

  if (!email) {
    isValid = false;
    errorMessage = '이메일을 입력해주세요.';
  } else if (!isValidEmail(email)) {
    isValid = false;
    errorMessage = '유효한 이메일을 입력해주세요.';
  }

  if (!message) {
    isValid = false;
    errorMessage = '메시지를 입력해주세요.';
  }

  if (!isValid) {
    // 에러 메시지 표시
    formMessage.innerHTML = errorMessage;
    formMessage.classList.remove('hidden', 'success-message');
    formMessage.classList.add('error-message');
    return;
  }

  // 성공 처리 (실제로는 서버에 전송)
  // 여기서는 데모 목적으로 로컬에서만 처리
  console.log('폼 제출:', { name, email, message });

  // 성공 메시지 표시
  formMessage.innerHTML = '✓ 메시지가 전송되었습니다! 곧 연락드리겠습니다.';
  formMessage.classList.remove('hidden', 'error-message');
  formMessage.classList.add('success-message');

  // 폼 초기화
  contactForm.reset();

  // 3초 후 메시지 숨기기
  setTimeout(() => {
    formMessage.classList.add('hidden');
  }, 3000);
});

// 입력 필드 포커스 시 에러 메시지 제거
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('focus', () => {
    formMessage.classList.add('hidden');
  });
});

// ========================
// 5. 추가 기능: 활성 네비게이션 표시
// ========================
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  // 활성 링크 업데이트 (선택사항 - 기본 스타일로도 충분함)
});

// ========================
// 6. 페이지 로드 완료 메시지 (개발용)
// ========================
window.addEventListener('load', () => {
  console.log('웹 이력서 로드 완료!');
  console.log('사용된 기술: HTML5, CSS3, JavaScript, TailwindCSS');
});

// ========================
// 7. 키보드 접근성 (Accessibility)
// ========================
document.addEventListener('keydown', (e) => {
  // Escape 키로 모바일 메뉴 닫기
  if (e.key === 'Escape') {
    mobileMenu.classList.add('hidden');
  }

  // Ctrl/Cmd + K로 맨 위로 이동 (선택사항)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
