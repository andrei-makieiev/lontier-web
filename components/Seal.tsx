/** Brand mark placeholder ("L" on the gold wax seal) until the client's logo arrives. */
export function Seal({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "seal seal--sm" : "seal"} aria-hidden="true">
      L
    </span>
  );
}
