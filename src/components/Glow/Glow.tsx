interface GlowProps {
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  delay?: string;
}

export const Glow = ({ width, height, top, left, bottom, right, delay }: GlowProps) => {
  return (
    <div
      className="glow-effect"
      style={{
        width: width || '400px',
        height: height || '400px',
        top,
        left,
        bottom,
        right,
        animationDelay: delay || '0s',
      }}
    ></div>
  );
};


