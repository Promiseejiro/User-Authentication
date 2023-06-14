interface Text {
  title: string;
  color: string;

  width: string;
  height: string;

  icon: any;
}
const Link = ({
  title,
  color,

  width,
  icon,
  height,
}: Text) => {
  return (
    <a
      className={`flex items-center justify-center hover:bg-blue-70 font-[400] focus:outline-none m-1`}
      style={{
        color: `${color}`,
        width: `${width}`,
        height: `${height}`,
      }}
      href={title}
    >
      {icon}{" "}
    </a>
  );
};
export default Link;
