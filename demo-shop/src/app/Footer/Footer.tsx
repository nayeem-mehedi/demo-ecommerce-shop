export default function Footer() {
  return (
    <footer className="footer main_footer px-10 py-5 text-neutral-800">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link-hover link">Design</a>
        <a className="link-hover link">Development</a>
        <a className="link-hover link">Maintenance</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact Us</h6>
        <a className="link-hover link" href="https://github.com/nayeem-mehedi" target="_blank">Github</a>
        <a className="link-hover link" href="http://www.linkedin.com/in/nayeem-mehedi" target="_blank">LinkedIn</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link-hover link" href="https://github.com/nayeem-mehedi/demo-ecommerce-shop?tab=GPL-3.0-1-ov-file" target="_blank">Terms of use</a>
      </nav>
    </footer>
  );
}
