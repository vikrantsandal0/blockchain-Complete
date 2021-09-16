import Table from "react-bootstrap/Table";

export default function AppTable({ children, ...rest }) {
  return <Table {...rest}>{children()}</Table>;
}

export function Head({ children, ...rest }) {
  return <thead {...rest}>{children}</thead>;
}

export function Body({ children, ...rest }) {
  return <tbody {...rest}>{children}</tbody>;
}

export function Row({ children, ...rest }) {
  return <tr {...rest}>{children}</tr>;
}
