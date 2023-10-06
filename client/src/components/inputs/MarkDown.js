import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';
const MarkDown = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {
    return (
        <div className='flex flex-col'>
            <span>{label}</span>
            <Editor
                apiKey='s42dtkmrwoj9leyw0s3sjlgqkr9gyp44f79uijr51tpvnla9'
                initialValue={value}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={e => changeValue(prev => ({ ...prev, [name]: e.target.getContent() }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(el => el.name === name) && <small className='text-xs text-main'>{invalidFields?.find(el => el.name === name)?.mes}</small>}
        </div>
    );
}

export default memo(MarkDown)