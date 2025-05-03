export default function Main(props: { children: React.ReactNode }) {
  const { children } = props;
  return <main className='flex-1 flex flex-col p-4 sm:p-4'>{children}</main>;
}
