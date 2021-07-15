import React,{useState,useRef,useEffect} from 'react'
import './styles.css'

function Dropdown({options,prompt,value,onChange}) {
    const [open,setOpen] = useState(false)
    const [query,setQuery] = useState("")
    const ref = useRef(null)
    useEffect(()=>{
        document.addEventListener("click",close)
        return ()=> document.removeEventListener("click",close)
    },[])
    function close(e) {
        console.dir([e.target,ref.current])
        setOpen(e && e.target === ref.current)
    }
    function filter(options){
        return options.filter((option)=>
            option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }
    function displayValue(){
        if(query.length >0) return query
        if(value) return value.name 
        return ""
    }
    return (
        <div className="dropdown">
            <div className="control"
                onClick={()=>setOpen((prev)=>!prev)}
            >
                <div className="selected-value">
                    <input type="text" 
                    ref={ref} 
                    placeholder={value? value : prompt}
                    value={displayValue()}
                    onChange={e=>{
                        setQuery(e.target.value)
                        onChange(null)
                    }}
                    onClick={()=>setOpen((prev)=>!prev)}
                    />
                    {/* {value? value.name:prompt} */}
                </div>
                <div className={`arrow ${open ?"open":null}`} />
            </div>
            <div className={`options ${open?"open":null}`}>
                {
                    filter(options).map(option => 
                        <div className={`option ${value===option?"selected":null}`}
                            onClick={()=>{
                                setQuery("")
                                onChange(option)
                                setOpen(false)
                            }}
                        >{option.name}</div>
                    )
                }

            </div>
        </div>
    )
}

export default Dropdown
