import { apiCreateNewProduct } from 'apis'
import { InputForm, Select, Button, MarkDown, Loading } from 'components'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { set, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getBase64, validate } from 'utils/helpers'
import { GrFormClose } from 'react-icons/gr'
import { showModal } from 'store/app/appSlice'

const CreateProduct = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const [payload, setPayload] = useState({
        description: ''
    })
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])
    const { handleSubmit, formState: { errors: errors }, reset, register, watch } = useForm()
    const handleCreateProduct = async (data) => {
        const invalid = validate(payload, setInvalidFields)
        if (invalid === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiCreateNewProduct(formData)
            if (response.success) {
                toast.success(response.mes)
                reset()
                setPayload({
                    thumb: '',
                    images: []
                })
            } else toast(response.mes)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
        }
    }
    const [hoverImage, setHoverImage] = useState(null)
    const [invalidFields, setInvalidFields] = useState([])
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }
    const handlePreviewImages = async (files) => {
        console.log(files)
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') {
                toast.warning('File does not support')
                return
            }
            const base64Images = await getBase64(file)
            // console.log(base64Images)
            imagesPreview.push({ name: file.name, path: base64Images })

        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }

    const handleRemoveImage = (name) => {
        const files = [...watch('images')]
        reset({
            images: files?.filter(el => el.name !== name)
        })
        if (preview.images?.some(el => el.name === name)) setPreview(prev => ({ ...prev, images: prev.images?.filter(el => el.name !== name) }))
    }


    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        handlePreviewImages(watch('images'))
    }, [watch('images')])
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Create New Product</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label={'Name product'}
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Require fill'
                        }}
                        fullWidth
                        placeholder='Name of New Product'
                    />
                    <div className='my-6 flex w-full gap-4'>
                        <InputForm
                            label={'Price'}
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Require fill'
                            }}
                            fullWidth
                            placeholder='Price of New Product'
                            style='flex-auto'
                        />
                        <InputForm
                            label={'Quantity'}
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{
                                required: 'Require fill'
                            }}
                            fullWidth
                            placeholder='Quantity of New Product'
                            style='flex-auto'

                        />
                        <InputForm
                            label={'Color'}
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{
                                required: 'Require fill'
                            }}
                            fullWidth
                            placeholder='Color of New Product'
                            style='flex-auto'

                        />
                    </div>
                    <div className='flex gap-4 my-6 w-full'>
                        <Select
                            label={'Category'}
                            options={categories?.map(el => ({ code: el._id, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Require fill' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                        <Select
                            label={'Brand Optional'}
                            options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({ code: el, value: el }))}
                            register={register}
                            id='brand'
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkDown
                        name='description'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className='flex flex-col gap-2 my-8'>
                        <label htmlFor="thumb">Upload Thumb</label>
                        <input
                            type="file"
                            id='thumb'
                            {...register('thumb', { required: 'Need upload file' })}
                        />
                        {errors['thumb'] && <small className='text-main text-xs'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div>
                        <img src={preview.thumb} alt="thumbnail" className='w-[200px]' />
                    </div>}
                    <div className='flex flex-col gap-2 my-8'>
                        <label htmlFor="products">Upload images of products</label>
                        <input
                            type="file"
                            id='products'
                            multiple
                            {...register('images', { required: 'Need upload file' })}
                        />
                        {errors['images'] && <small className='text-main text-xs'>{errors['images']?.message}</small>}

                    </div>
                    {preview.images.length > 0 && <div className='w-full flex gap-3 flex-wrap my-4'>
                        {preview.images?.map((el, index) => (
                            <div
                                onMouseEnter={() => setHoverImage(el.name)}
                                key={index}
                                className='w-fit relative cursor-pointer'
                                onMouseLeave={() => setHoverImage(null)}
                            >
                                < img src={el.path} alt="products" className='w-[200px] object-contain ' />
                                {hoverImage === el.name && <div className='absolute inset-0 bg-overlay-1'>
                                    <span
                                        onClick={() => handleRemoveImage(el.name)}
                                        className='absolute top-[5px] right-[5px]'
                                    >
                                        <GrFormClose size={30} className='' />
                                    </span>
                                </div>}
                            </div>

                        ))}
                    </div>}
                    <Button type='submit'>
                        Create New Product
                    </Button>
                </form>
            </div >
        </div >
    )
}

export default CreateProduct
