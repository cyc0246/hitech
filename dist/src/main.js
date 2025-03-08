document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
  });

document.addEventListener("click", function (event) {
const menu = document.querySelector(".nav-menu");
const menuToggle = document.querySelector(".menu-toggle");

// 메뉴가 열려 있고, 클릭한 요소가 메뉴 또는 햄버거 버튼이 아닐 경우 메뉴 닫기
if (menu.classList.contains("active") && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.remove("active");
}
});


// thermo 슬라이드
document.addEventListener("DOMContentLoaded", function () {
    const slideContainer = document.querySelector(".thermo-slide .slide-container ul");
    const prevButton = document.querySelector(".thermo-slide .slide-button.prev");
    const nextButton = document.querySelector(".thermo-slide .slide-button.next");
    const slides = document.querySelectorAll(".thermo-slide .slide-container ul li");
    let currentIndex = 0;
  
    function updateSlide() {
      const slideWidth = slides[0].clientWidth;
      slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  
    nextButton.addEventListener("click", function () {
      if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlide();
      } else {
        currentIndex = 0; // 마지막 이미지에서 처음으로 돌아가기 (무한 루프)
        updateSlide();
      }
    });
  
    prevButton.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlide();
      } else {
        currentIndex = slides.length - 1; // 처음 이미지에서 마지막으로 이동
        updateSlide();
      }
    });
  
    window.addEventListener("resize", updateSlide);
  });


  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeButton = document.querySelector(".modal .close-button");
  
    document.querySelectorAll(".metal-gallery img").forEach(img => {
      img.addEventListener("click", function () {
        modalImage.src = this.src;
        modal.classList.add("show");
      });
    });
  
    closeButton.addEventListener("click", function () {
      modal.classList.remove("show");
    });
  
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  });


  //product 페이지 스크롤 효과 적용
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".full-page");
    const lastSection = document.querySelector(".product-gallery"); // 마지막 섹션 선택
    let currentIndex = 0;
    let isScrolling = false;
  
    function isDesktop() {
      return window.innerWidth > 900; // 900px 이상에서만 적용
    }
  
    function scrollToSection(index) {
      if (index >= 0 && index < sections.length) { // product-gallery 제외
        isScrolling = true;
        window.scrollTo({
          top: sections[index].offsetTop,
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrolling = false;
        }, 600);
      }
    }
  
    function handleScroll(event) {
      if (!isDesktop() || isScrolling) return;
      const scrollThreshold = window.innerHeight / 4; // 스크롤 감도 감소 → 부드러운 이동
  
      if (Math.abs(event.deltaY) < scrollThreshold && currentIndex !== 0 && currentIndex !== sections.length - 1) {
        return; // 작은 스크롤 변화는 무시하되, 첫 번째와 마지막 섹션에서는 적용되지 않음
      }
  
      // product-gallery 섹션에 도달하면 기본 스크롤 유지
      if (window.innerHeight + window.scrollY >= lastSection.offsetTop) {
        return;
      }
  
        // 위로 스크롤할 때 일정 높이 이상 이동하면 이전 섹션으로 이동
        if (event.deltaY < 0 && window.scrollY <= sections[currentIndex].offsetTop - window.innerHeight * 0.3) {
            currentIndex = Math.max(currentIndex - 1, 0);
            scrollToSection(currentIndex);
            return;
      }
  
      if (event.deltaY > 0) {
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
      }
  
      scrollToSection(currentIndex);
    }
  
    function handleKeydown(event) {
      if (!isDesktop() || isScrolling) return;
  
      // product-gallery 섹션에 도달하면 기본 스크롤 유지
      if (window.scrollY >= lastSection.offsetTop - window.innerHeight / 2) {
        return;
      }
  
      if (event.key === "ArrowDown") {
        currentIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else if (event.key === "ArrowUp") {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
  
      scrollToSection(currentIndex);
    }
  
    document.addEventListener("wheel", handleScroll);
    document.addEventListener("keydown", handleKeydown);
  });