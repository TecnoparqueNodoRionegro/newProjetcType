import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { stylePublication } from '../../../../theme';
import { Editor } from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.css";
import { templates } from '../../../../constants/templates';
import { Alerts,MenuUser } from '../../../../components';
import { auth } from '../../../../components/Auth';
import { api,resources } from '../../../../utils/sdk';

const AddPublicationAgent=()=>{
    const [text, setText] = useState("");
    const [value,setValue]=useState(templates[3].html)
    const [publications,setPublications]=useState({tags:[3],state:2,account:[auth.users.id]})
    const [showAlert,setShowAlert]=useState(0)
    let navigate = useNavigate();

    const savePublications=async()=>{
        console.log(publications.name)
        if(publications.category_id===undefined || publications.category_id===0 || publications.name===undefined || publications.name===''){
            setShowAlert(1)
        }else{
          try{
            await api.post(`${resources.article}`,publications)
            setShowAlert(2)
            setTimeout(() => {
                navigate('/publicaciones-agente')
              }, 2000);
          }catch (err){
            console.log("error",err)
            setShowAlert(3)
          }
        }
    }

    return(
        <div>
            <div className="menu-component">
                <MenuUser />
            </div>
            <div className='request-agent'>
                <div className='title-add-publication'>
                    <p>Agregar publicacion</p>
                </div>
                <div className='row form-add-publications'>
                    <div className='col-6'>
                        <input onChange={(e)=>setPublications({...publications,name:e.target.value})} placeholder='Nombre' className='input-add-publication' />
                    </div>
                    <div className='col-6'>
                        <select onChange={(e)=>setPublications({...publications,category_id:e.target.value})} className='input-add-publication'>
                            <option value={0}>Selecciona una categoria</option>
                            <option value={1}>Hospedaje</option>
                            <option value={2}>Restaurante</option>
                            <option value={3}>Entretenimiento</option>
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
                            setPublications({ ...publications, html: newValue });
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
                {showAlert===1 ? <Alerts style="error">Llene todos los campos</Alerts>:showAlert===2 ? <Alerts style="success">Articulo agregado exitosamente</Alerts>:showAlert===3 ? <Alerts style="error">No se pudo guardar el articulo</Alerts>:''}
                <div className='row justify-content-end'>
                <div className='col-2'>
                        <button className='btn-add-publications'>
                        <Link  to="/publicaciones-agente">Volver</Link>
                        </button>
                    </div>
                    <div className='col-2'>
                        <button className='btn-add-publications' onClick={()=>savePublications()}>Guardar</button>
                    </div>                    
                </div>
            </div>
        </div>
    )
}

export default AddPublicationAgent