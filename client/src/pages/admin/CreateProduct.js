import { apiCreateNewProduct } from 'apis'
import { InputForm, Select, Button, MarkDown } from 'components'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { set, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { validate } from 'utils/helpers'

const CreateProduct = () => {
    const { categories } = useSelector(state => state.app)
    const { handleSubmit, formState: { errors: errors }, register, watch } = useForm()
    const handleCreateProduct = (data) => {
        const invalid = validate(payload, setInvalidFields)
        if (invalid === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
            const finalPayload = { ...data, payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            // for (var pair of formData.entries()) {
            //     console.log(pair[0] + ' ' + pair[1])
            // }
        }
    }
    const [payload, setPayload] = useState({
        description: ''
    })
    const [invalidFields, setInvalidFields] = useState([])
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

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
                    <Button type='submit'>
                        Create New Product
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
