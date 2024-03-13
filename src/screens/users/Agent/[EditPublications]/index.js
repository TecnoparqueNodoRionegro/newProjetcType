"use client"
import React,{useState,useEffect} from 'react'
import MenuUser from "@/app/src/Components/navUser/MenuUser";
import Link from 'next/link';
import { routers } from '@/app/src/Routers';
import { Editor } from "@tinymce/tinymce-react";
import { api, resources } from "@/app/src/utils/sdk/";
import "bootstrap/dist/css/bootstrap.css";
import { Alerts } from '@/app/src/Components';
import { useRouter } from "next/navigation";

const EditPublication=({params})=>{
    const id=params.EditPublications
    const router = useRouter();
    const [publication,setPublication]=useState({})
    const [value,setValue]=useState()
    const [text, setText] = useState("");
    const [categoriesEdit,setCategoriesEdit]=useState([])
    const [showAlert,setShowAlert]=useState()

    const getPublication=async()=>{
        const response=await api.get(`${resources.article}${id}`)
        setPublication(response.data)
        setValue(response.data.html)
        getCategoryPublication(response.data.category_id)
    }

    const categories=[
        {option:1,label:"Hospedaje"},
        {option:2,label:"Restaurante"},
        {option:3,label:"Entretenimiento"},
    ]

    const getCategoryPublication=(id)=>{
        setCategoriesEdit(categoriesEdit=>[...categoriesEdit,categories.filter(item=>item.option!=id)])
    }
    
    useEffect(()=>{
        getPublication()
    },[])

    const editPublication=async()=>{
        console.log("p",publication) 
        if(publication.name===''||publication.html===''){
            setShowAlert(1)
        }else{
            try{
                await api.put(`${resources.article}${id}/`,publication)
                setShowAlert(2)
                setTimeout(() => {
                    router.push("/src/Page/User/Agent");
                  }, 2000);
            }catch{
                setShowAlert(3)
            }
        }
    }

    return (
        <div className="content-user">
            <div className="menu-component">
                <MenuUser />
            </div>
            <div className='request-agent'>
            <div className='row form-add-publications'>
                    <div className='col-6'>
                        <p>Nombre</p>
                        <input value={publication.name} onChange={(e)=>setPublication({...publication,name:e.target.value})} className='form-control' />
                    </div>
                    <div className='col-6'>
                        <p>Categoria</p>
                        <select onChange={(e)=>setPublication({...publication,category_id:e.target.value})} className='form-control'>
                            {Object.keys(publication).length > 0 
                            ?
                            <option value={publication.category_id}>{publication.category.name}</option>
                            :
                            ''
                            }
                            {Array.isArray(categoriesEdit[0])
                            ?
                            categoriesEdit[0].map((item,index)=>(
                                <option key={index} value={item.option}>{item.label}</option>
                            ))
                            :
                            ''
                            }
                        </select>
                    </div>
                    <div className='col-12'>
                    <Editor
                        value={value}
                        onInit={(evt, editor) => {
                            setText(editor.getContent({ format: "text" }));
                        }}
                        onEditorChange={(newValue, editor) => {
                            setValue(newValue);
                            setPublication({ ...publication, html: newValue });
                            setText(editor.getContent({ format: "text" }));
                        }}
                        apiKey="tig6waa2uh41w9jlxhlp01qudhpvxnm45w3tzbwx6lojj8tm"
                        init={{
                            plugins:
                            "preview  autolink autosave  directionality code visualchars fullscreen image link media table pagebreak  emoticons accordion",
                            menubar: "file insert format tools table help",
                            toolbar:
                            "undo redo | accordion accordionremove | align numlist bullist | link image | table media | pagebreak anchor codesample | ltr rtl",

                            image_advtab: true,
                            // image_title: true,
                            automatic_uploads: true,
                            file_picker_types: "image",
                            image_dimensions: true,
                            // autoresize_max_height: 100,
                            a11y_advanced_options: true,
                            // image_advtab: true,
                            pagebreak_separator: "<!-- Ver más información -->",

                            file_picker_callback: (cb, value, meta) => {
                            const input = document.createElement("input");
                            input.setAttribute("type", "file");
                            input.setAttribute("accept", "image/*");

                            input.addEventListener("change", (e) => {
                                const file = e.target.files[0];

                                const reader = new FileReader();
                                reader.addEventListener("load", () => {
                                const id = "blobid" + new Date().getTime();
                                const blobCache =
                                    tinymce.activeEditor.editorUpload.blobCache;
                                const base64 = reader.result.split(",")[1];
                                const blobInfo = blobCache.create(id, file, base64);

                                const data = new FormData();
                                data.append("file", blobInfo.blob(), blobInfo.filename());

                                fetch(`${api}${resources.files}`, {
                                    method: "POST",
                                    body: data,
                                })
                                    .then((response) => response.json())
                                    .then((result) => {
                                    cb(result.file, { title: file.name });
                                    })
                                    .catch((error) => {
                                    console.error("Error al subir la imagen: ", error);
                                    failure("Error al subir la imagen");
                                    });
                                });
                                reader.readAsDataURL(file);
                            });

                            input.click();
                            },
                        }}
                    />
                    </div>
                </div>
                {showAlert===1 ?<Alerts style="error">LLene todos los campos</Alerts>:showAlert===2 ?<Alerts style="success">Articulo editado correctamente</Alerts>:showAlert===3 ?<Alerts style="error">No se pudo editar</Alerts>:''}
                <button onClick={()=>editPublication()}>Editar</button>
                <Link href={routers.publicationsAgent}>Volver</Link>
            </div>
        </div>
    )
}

export default EditPublication