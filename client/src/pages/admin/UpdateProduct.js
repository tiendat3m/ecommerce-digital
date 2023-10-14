import React, { useState, useCallback, useEffect } from 'react'
import { InputForm, Select, Button, MarkDown, Loading } from 'components'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getBase64, validate } from 'utils/helpers'
import { GrFormClose } from 'react-icons/gr'
import { showModal } from 'store/app/appSlice'
import { apiUpdateProduct } from 'apis'

const UpdateProduct = ({ editProduct, render, setEditProduct }) => {
    const { handleSubmit, formState: { errors: errors }, reset, register, watch } = useForm()
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const [payload, setPayload] = useState({
        description: ''
    })
    const [invalidFields, setInvalidFields] = useState([])
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }
    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            brand: editProduct?.brand?.toLowerCase() || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
        })
        setPayload({ description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(', ') : editProduct?.description })
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })
    }, [editProduct])

    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') {
                toast.warning('File does not support')
                return
            }
            const base64Images = await getBase64(file)
            // console.log(base64Images)
            imagesPreview.push(base64Images)

        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))
    }

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) {
            handlePreviewThumb(watch('thumb')[0])
        }
    }, [watch('thumb')])
    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImages(watch('images'))
        }
    }, [watch('images')])

    const handleUpdateProduct = async (data) => {
        const invalid = validate(payload, setInvalidFields)
        if (invalid === 0) {
            if (data.category) data.category = categories?.find(el => el.title === data.category)?.title
            const finalPayload = { ...data, ...payload }
            finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            finalPayload.images = data?.images?.length === 0 ? preview.images : data.images
            for (let image of finalPayload.images) formData.append('images', image)
            // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiUpdateProduct(formData, editProduct?._id)
            // dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                render()
                setEditProduct(null)
            } else toast(response.mes)
        }
    }
    // const [hoverImage, setHoverImage] = useState(null)



    // const handleRemoveImage = (name) => {
    //     const files = [...watch('images')]
    //     reset({
    //         images: files?.filter(el => el.name !== name)
    //     })
    //     if (preview.images?.some(el => el.name === name)) setPreview(prev => ({ ...prev, images: prev.images?.filter(el => el.name !== name) }))
    // }


    return (
        <div className='w-full bg-gray-100'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Update Product</span>
                <span
                    className='text-main hover:underline text-sm cursor-pointer font-normal'
                    onClick={() => setEditProduct(null)}
                >
                    Cancel
                </span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
                            options={categories?.map(el => ({ code: el.title, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Require fill' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                        <Select
                            label={'Brand Optional'}
                            options={categories?.find(el => el.title?.toLowerCase() === watch('category')?.toLowerCase())?.brand?.map(el => ({ code: el.toLowerCase(), value: el }))}
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
                        value={payload.description}
                    />
                    <div className='flex flex-col gap-2 my-8'>
                        <label htmlFor="thumb">Upload Thumb</label>
                        <input
                            type="file"
                            id='thumb'
                            {...register('thumb')}
                        />
                        {errors['thumb'] && <small className='text-main text-xs'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview?.thumb && <div>
                        <img src={preview?.thumb} alt="thumbnail" className='w-[200px] object-contain h-[200px]' />
                    </div>}
                    <div className='flex flex-col gap-2 my-8'>
                        <label htmlFor="products">Upload images of products</label>
                        <input
                            type="file"
                            id='products'
                            multiple
                            {...register('images')}
                        />
                        {errors['images'] && <small className='text-main text-xs'>{errors['images']?.message}</small>}

                    </div>
                    {preview?.images?.length > 0 && <div className='w-full flex gap-3 flex-wrap my-4'>
                        {preview?.images?.map((el, index) => (
                            <div
                                key={index}
                                className='cursor-pointer '
                            >
                                < img src={el} alt="products" className='w-[200px] h-[200px] object-contain' />
                            </div>

                        ))}
                    </div>}
                    <Button type='submit'>
                        Update New Product
                    </Button>
                </form>
            </div >
        </div >
    )
}

export default memo(UpdateProduct)
