import { useCallback, useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const  [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  const passwotdRef= useRef()




  const PasswordGenerator = useCallback(()=>{           //function defination
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="0123456789"
    }
    if(charAllowed){
      str+="!@#$%&*/?~"
    }

    for (let i = 1; i < length; i++){
      let char=Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char)

      setPassword(pass)


    }
   
  }
    ,[length,numberAllowed,charAllowed,setPassword])

    const copyPassword=useCallback(()=>{
      passwotdRef.current?.select()
      passwotdRef.current?.setSelectionRange(0,10)
      window.navigator.clipboard.writeText(Password)

    },[Password])

   useEffect(()=>{
PasswordGenerator()
    },[length,numberAllowed,charAllowed,PasswordGenerator])

  return (
    <>
    <h1 class="text-4xl text-center text-white">Password Generator</h1>
    <div class="h-[200px] w-[550px] rounded-md bg-gray-500 shadow-md my-8 overflow-hidden">
      <div className='flex '>

        <input type="text"
        value={Password}
        placeholder='password'
        ref={passwotdRef}
      
         className="bg-white border border-balck-2 text-orange-500  text-2xl h-[60px] w-[400px] rounded-md rounded-r-none mt-5 ml-6 " />

        <button onClick={copyPassword} class="bg-blue-600 text-[18px]   text-white h-[60px] w-[80px] rounded-md rounded-l-none mt-5">Copy</button>
      </div>


      <div class="flex text-sm  gap-x-2 mt-5 ml-5">
      <div class="flex items-center gap-x-1">
        <input type="range"
        min={5}
         max={50}
         value={length}
         class=" cursor-pointer p-6"
         onChange={(e)=>{setLength(e.target.value)}}
         />
         <label class="text-yellow-500">length:{length}</label>

      </div>

      <div className=" flex items-center gap-x-1">
        
        <input type="checkbox"
        defaultChecked={numberAllowed} 
        id="numberInput"
        onChange={()=>{
          setnumberAllowed((prev)=>!prev)
        }}
        />
        <label htmlFor='numberInput'>Number</label>
      </div>

      <div className=" flex items-center gap-x-1">
        
        <input type="checkbox"
        defaultChecked={charAllowed} 
        id="CharInput"
        onChange={()=>{
          setcharAllowed((prev)=>!prev)
        }}
        />
        <label htmlFor='CharInput'>Character</label>
      </div>

    </div>
    </div>

   
    </>
  )
}

export default App
