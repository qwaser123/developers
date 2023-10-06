export default function Footer() {
  return (
    <div className='container'>
      <footer className='row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top'>
        <div className='col mb-3'>
          <div className='d-flex align-items-center mb-3 link-dark text-decoration-none'>
            <svg className='bi me-2' width='40' height='32'></svg>
          </div>
          <p className='text-muted'>© 2023</p>
        </div>

        <div className='col mb-3'></div>

        <div className='col mb-3'>
          <h5>Section</h5>
          <ul className='nav flex-column'>
            <li className='nav-item mb-2'>Home</li>
            <li className='nav-item mb-2'>Features</li>
            <li className='nav-item mb-2'>Pricing</li>
            <li className='nav-item mb-2'>FAQs</li>
            <li className='nav-item mb-2'>About</li>
          </ul>
        </div>

        <div className='col mb-3'>
          <h5>Section</h5>
          <ul className='nav flex-column'>
            <li className='nav-item mb-2'>Home</li>
            <li className='nav-item mb-2'>Features</li>
            <li className='nav-item mb-2'>Pricing</li>
            <li className='nav-item mb-2'>FAQs</li>
            <li className='nav-item mb-2'>About</li>
          </ul>
        </div>

        <div className='col mb-3'>
          <h5>Section</h5>
          <ul className='nav flex-column'>
            <li className='nav-item mb-2'>Home</li>
            <li className='nav-item mb-2'>Features</li>
            <li className='nav-item mb-2'>Pricing</li>
            <li className='nav-item mb-2'>FAQs</li>
            <li className='nav-item mb-2'>About</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
