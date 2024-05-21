window.onload = function () {
  // AOS 초기화
  AOS.init();

  // Swiper 슬라이더 초기화 코드 추가
  new Swiper(".swVisual", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    autoplay: {
      delay: 2500, // 시간 설정
      disableOnInteraction: false, // false-스와이프 후 자동 재생
    },
    loop: true,
    // 추가적인 Swiper 설정을 여기에 추가할 수 있습니다.
  });

  // 스크롤 기능
  let scy = 0;
  let acActive = 50;
  scy = window.document.documentElement.scrollTop;
  let header = document.querySelector("header");
  header.addEventListener("mouseenter", function () {
    header.classList.add("header-active");
  });

  // 헤더: 새로고침 시
  header.addEventListener("mouseleave", function () {
    if (scy < acActive) {
      header.classList.remove("header-active");
    }
    window.addEventListener("scroll", function () {
      scy = window.document.documentElement.scrollTop;
      if (scy > acActive) {
        header.classList.add("header-active");
      } else {
        header.classList.remove("header-active");
      }
    });
  });

  // // 클릭 스크롤
  // const navbar = document.querySelectorAll(".header-right > div");
  // const goPortfolio = document.querySelector(".vmw");
  // navbar.forEach((navbarItem) =>
  //   navbarItem.addEventListener("click", (e) => {
  //     link = e.currentTarget.dataset.link;
  //     scrollIntoView(link);
  //   })
  // );
  // goPortfolio.addEventListener("click", () => {
  //   scrollIntoView(goPortfolio.dataset.link);
  // });

  // // 스크롤 이동 함수
  // function scrollIntoView(selector) {
  //   const scrollTo = document.querySelector(selector);
  //   scrollTo.scrollIntoView({ behavior: "smooth" });
  // }

  // JSON 연결 및 프로젝트 출력
  fetch("hee.json")
    .then((response) => response.json())
    .then((data) => {
      const portfolioItems = data.portfolioItems;
      const dataVisual = document.getElementById("data-visual");
      portfolioItems.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `
      <div class="project">
      <div class="pj-img">
          <img src="${item.src}" class"stx-gif"/>
      </div>
      <div class="study-project">
          <h2 class="pp">${item.h}</h2>
          <h1>${item.title}</h1>
          <p>${item.date}</p>
          <span>
              제작 인원: ${item.contributors} <br />
              사용 프로그램: ${item.technologies}
          </span>
          <div class="swiper-btn">
          <a href="${item.link.work || item.link.Notion}" target="_blank">${item.link.workLabel}</a>
          <a href="${item.link.github || item.link.GitHub}" target="_blank">${item.link.githubLabel}</a>
          <a href="${item.link.origin || item.link.Figma}" target="_blank">${item.link.originLabel}</a>
          </div>
      </div>
    </div>
      `;
        dataVisual.appendChild(slide);
      });
    })
    .catch((error) => {
      console.error("JSON 파일 로드 중 오류 발생:", error);
    });

  // 스킬 앤 툴 애니메이션
  const SNT = document.querySelector(".snt-box");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedProgressSpans = document.querySelectorAll(".animated-progress span");
        animatedProgressSpans.forEach(function (span) {
          const dataProgress = span.getAttribute("data-progress");
          span.style.width = dataProgress + "%";
          span.textContent = dataProgress + "%";
          const duration = 1000;
          const start = performance.now();
          const end = start + duration;
          function animate() {
            const now = performance.now();
            const timeFraction = (now - start) / duration;
            if (timeFraction > 1) {
              span.style.width = dataProgress + "%";
              return;
            }
            const progress = timeFraction;
            span.style.width = progress * dataProgress + "%";
            requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        });
      }
    });
  });
  observer.observe(SNT);
};
