import React from 'react'

function App() {

  return (
    <div className='h-full grid grid-rows-header-footer'>
      <header>
      <h1 className='text-xl text-primary font-bold'>Website</h1>
      </header>
      <div className='container flex flex-col justify-center items-center'>
      <p>Content</p>
      <button className='btn btn-accent'>
        Hello DaisyUI
      </button>

      </div>
      <footer>Footer</footer>
    </div>
  )
}

export default App
