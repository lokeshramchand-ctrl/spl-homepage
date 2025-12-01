export function initMenuHover() {
  const X_OFFSET_DIVISOR = 1.55;
  const Y_OFFSET_RANGE = [-150, 150];

  gsap.defaults({
    duration: 0.55,
    ease: "expo.out",
  });

  function initMenuItem(item) {
    const imageWrapper = item.querySelector(".menu-item__image");
    let imageWrapperBounds = imageWrapper.getBoundingClientRect();
    let itemBounds = item.getBoundingClientRect();

    const moveX = gsap.quickTo(imageWrapper, "x", { duration: 1.25, ease: "power3" });
    const moveY = gsap.quickTo(imageWrapper, "y", { duration: 1.25, ease: "power3" });

    const onMouseEnter = () => {
      gsap.set(imageWrapper, {
        scale: 0.8,
        xPercent: 25,
        yPercent: 50,
        rotation: -15
      });
      gsap.to(imageWrapper, {
        opacity: 1,
        scale: 1,
        yPercent: 0,
        rotation: 0
      });
    };

    const onMouseLeave = () =>
      gsap.to(imageWrapper, {
        opacity: 0,
        yPercent: -50,
        xPercent: 25,
        scale: 0.8,
        rotation: -15
      });

    const onMouseMove = ({ x, y }) => {
      const yOffset = gsap.utils.mapRange(
        0, 1.5, Y_OFFSET_RANGE[0], Y_OFFSET_RANGE[1], itemBounds.top / imageWrapperBounds.height
      );

      moveX(Math.abs(x - itemBounds.left) - imageWrapperBounds.width / X_OFFSET_DIVISOR);
      moveY(Math.abs(y - itemBounds.top) - imageWrapperBounds.height / 2 - yOffset);
    };

    const updateBounds = () => {
      itemBounds = item.getBoundingClientRect();
      imageWrapperBounds = imageWrapper.getBoundingClientRect();
    };

    item.addEventListener("mouseenter", onMouseEnter);
    item.addEventListener("mouseleave", onMouseLeave);
    item.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", updateBounds);
  }

  document.querySelectorAll(".menu-item").forEach(initMenuItem);
}
