

const Button = ({type, classname, onClick, children}) => {

  const buttonsStyles = (type) => {
    switch(type) {
      case 'primary': return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      case 'secondary': return 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      default: return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    }
  }

  return ( 
    <button className={`${buttonsStyles(type)} ${classname}`} onClick={onClick} >{children}</button>
  )
}

export default Button