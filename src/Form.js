import { Form, Formik, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'

function MyTextInput({label, ...props}) {
    const [field, meta] = useField(props)

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </>
    )
}

function MyCheckbox({children, ...props}) {
    const [field, meta] = useField({...props, type: 'checkbox'})

    return (
        <>
            <label className="checkbox">
                <input type="checkbox" {...props} {...field}/>
                {children}
            </label>
            
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </>
    )
}

function CustomForm() {

    return (
        <Formik
            initialValues = {{
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                            .min(2, 'minimum 2 symbol to fill')
                            .required('required field'),
                email: Yup.string()
                            .email('wrong email')
                            .required('required field'),
                amount: Yup.number()
                            .min('at least 5')
                            .required('required field'),
                currency: Yup.string()
                            .required('select currency'),
                text: Yup.string()
                            .min(10, 'minimum 10 symbol to fill'),
                terms: Yup.boolean()
                            .required('necessary agreement')
                            .oneOf([true], 'necessary agreement')
                })
            }
            onSubmit = {values => JSON.stringify(values, null, 2)}
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                />

                <MyTextInput
                    label='Ваша почта'
                    id="email"
                    name="email"
                    type="text"
                />
                
                <MyTextInput
                    label='Количество'
                    id="amount"
                    name="amount"
                    type="number"
                />
                
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select'
                    >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name="currency" component='div'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className='error' name="text" component='div'/>

                <MyCheckbox name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckbox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;