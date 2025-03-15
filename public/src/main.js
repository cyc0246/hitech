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


// 슬라이드 기능
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".thermo-slide").forEach(slideWrapper => {
        const slideContainer = slideWrapper.querySelector(".slide-container ul");
        const prevButton = slideWrapper.querySelector(".slide-button.prev");
        const nextButton = slideWrapper.querySelector(".slide-button.next");
        const slides = slideWrapper.querySelectorAll(".slide-container ul li");
        let currentIndex = 0;

        function updateSlide() {
            const slideWidth = slides[0].clientWidth;
            slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextButton.addEventListener("click", function () {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // 마지막에서 처음으로 루프
            }
            updateSlide();
        });

        prevButton.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1; // 처음에서 마지막으로 루프
            }
            updateSlide();
        });

        window.addEventListener("resize", updateSlide);
    });
});


// metal-gallery 이미지 모달 기능

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

// product 섹션 스크롤

document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".full-page");
    let currentIndex = 0;
    let isScrolling = false;

    function isDesktop() {
        return window.innerWidth > 900; // 900px 이상에서만 적용
    }

    function scrollToSection(index) {
        sections = document.querySelectorAll(".full-page"); // 동적으로 섹션 업데이트

        if (index >= 0 && index < sections.length) {
            window.scrollTo({
                top: sections[index].offsetTop,
                behavior: "smooth",
            });
        }
    }

    function handleScroll(event) {
        if (!isDesktop() || isScrolling) return; // 이미 이동 중이면 차단

        sections = document.querySelectorAll(".full-page"); // 동적으로 섹션 업데이트
        const threshold = window.innerHeight * 0.1; // 화면 높이의 10%를 이동 기준으로 설정

        let viewportBottom = window.scrollY + window.innerHeight - threshold;
        let viewportTop = window.scrollY + threshold;

        if (event.deltaY > 0) { // 스크롤을 아래로 내릴 때
            if (currentIndex < sections.length - 1) {
                const nextSection = sections[currentIndex + 1];
                if (viewportBottom >= nextSection.offsetTop) { // 화면 하단에서 10% 위 지점이 다음 섹션 상단에 닿으면 이동
                    isScrolling = true;
                    currentIndex++;
                    scrollToSection(currentIndex);
                    setTimeout(() => { isScrolling = false; }, 600);
                }
            }
        } else { // 스크롤을 위로 올릴 때
            if (currentIndex > 0) {
                const prevSection = sections[currentIndex - 1];
                if (viewportTop <= prevSection.offsetTop + prevSection.clientHeight) { // 화면 상단에서 10% 아래 지점이 이전 섹션 바닥에 닿으면 이동
                    isScrolling = true;
                    currentIndex--;
                    scrollToSection(currentIndex);
                    setTimeout(() => { isScrolling = false; }, 600);
                }
            }
        }
    }

    function handleKeydown(event) {
        if (!isDesktop()) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (currentIndex < sections.length - 1) {
                currentIndex++;
                scrollToSection(currentIndex);
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (currentIndex > 0) {
                currentIndex--;
                scrollToSection(currentIndex);
            }
        }
    }

    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("keydown", handleKeydown, { passive: false });
});
