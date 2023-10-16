import { apiAddVariant } from 'apis'
import Button from 'components/buttons/Button'
import Loading from 'components/common/Loading'
import InputForm from 'components/inputs/InputForm'
import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { showModal } from 'store/app/appSlice'
import Swal from 'sweetalert2'
import { getBase64 } from 'utils/helpers'

const CustomizeVariant = ({ customizeVariant, setCustomizeVariant }) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    useEffect(() => {
        reset({
            title: customizeVariant?.title || '',
            price: customizeVariant?.price || '',
            color: customizeVariant?.color || '',
        })
    }, [customizeVariant])
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }


    const handleAddVariants = async (data) => {
        if (data.color === customizeVariant.color) Swal.fire('Opps', 'Color not changed', 'info')
        else {
            const formData = new FormData()
            for (let i of Object.entries(data)) formData.append(i[0], i[1])
            if (data.thumb) formData.append('thumb', data.thumb[0])
            if (data.images) {
                for (let image of data.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiAddVariant(formData, customizeVariant?._id)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                reset()
                setPreview({
                    thumb: '',
                    images: []
                })
            } else toast.error(response.mes)
        }
    }
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

    return (
        <div className='w-full bg-gray-100'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Customize Products Variants</span>
                <span
                    className='text-main hover:underline text-sm cursor-pointer font-normal'
                    onClick={() => setCustomizeVariant(null)}
                >
                    Back
                </span>
            </h1>
            <form onSubmit={handleSubmit(handleAddVariants)} className='p-4 w-full flex flex-col gap-4'>
                <div className='flex w-full items-center gap-4'>
                    <InputForm
                        label={'Product Name'}
                        register={register}
                        errors={errors}
                        id={'title'}
                        style='flex-auto'
                        fullWidth
                    />
                </div>
                <div className='flex gap-4'>
                    <InputForm
                        label={'Price Product'}
                        register={register}
                        errors={errors}
                        validate={{
                            required: 'Require fill'
                        }}
                        id='price'
                        style='flex-auto'
                        fullWidth
                        type='number'
                    />
                    <InputForm
                        label={'Color Variants'}
                        register={register}
                        errors={errors}
                        id={'color'}
                        validate={{
                            required: 'Require fill'
                        }}
                        style='flex-auto'
                        fullWidth
                    />
                </div>
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
                            key={index}
                            className='w-fit relative cursor-pointer'
                        >
                            <img src={el} alt="products" className='w-[200px] object-contain ' />

                        </div>

                    ))}
                </div>}
                <Button type='submit'>
                    Add Product Variants
                </Button>
            </form>
        </div>
    )
}

export default memo(CustomizeVariant)