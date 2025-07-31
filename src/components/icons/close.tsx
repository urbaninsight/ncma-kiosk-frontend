interface CloseIconProps {
  className?: string;
}

export default function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="inherit"
    >
      <path
        d="M2.32639 21.1111L0.25 19.0347L8.55556 10.7291L0.25 2.42356L2.32639 0.347168L10.6319 8.65272L18.9375 0.347168L21.0139 2.42356L12.7083 10.7291L21.0139 19.0347L18.9375 21.1111L10.6319 12.8055L2.32639 21.1111Z"
        fill="inherit"
      />
    </svg>
  );
}
