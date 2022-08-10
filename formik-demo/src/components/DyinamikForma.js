import React from 'react'
import  {Formik , Form, Field, FieldArray, ErrorMessage} from 'formik';
import * as Yup from 'yup';

export default function DyinamikForma() {

    const initialValues = {
        numberOftickets : '',
        tickets: []
    };


    const validationSchema = Yup.object().shape({
        numberOftickets: Yup.string().required("Number of tickets is required"),
        tickets: Yup.array().of(
            Yup.object().shape({
                name: Yup.string()
                .required("Name is required"),
                email: Yup.string()
                .email("Email is invalid")
                .required("Email is required")
            })
        )
    })


    function onChangeTickets(e, field, values, setValues){
        //update qiladi dinamik formani
        const tickets = [...values.tickets];
        const numberOftickets = e.target.value || 0;
        const previousNumber = parseInt(field.value || '0');
        if(previousNumber < numberOftickets){
            for(let i = previousNumber; i < numberOftickets; i++){
                tickets.push({name: '', email: ''});
            }
        } else{
            for(let i = previousNumber; i >= numberOftickets; i--){
                tickets.splice(i, 1)//ma'lumot qo'shadi
            }
        }

        setValues({...values, tickets});
        field.onChange(e)
    }

    function onSubmit(fields){
        //Muvaffaqiyatli shakl maydoni qiymatlarini ko'rsatish
        alert('SUCCESS!! :) \n\n' + JSON.stringify(fields, null, 4));

    }


    return (
          <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {({errors, values, touched, setValues}) => (
                <Form>
                    <div className='card m-3'> 
                        <h5 className='card-header'>React + Formik Dynamic Form Example</h5>
                        <div className="card-body border-bottom">
                             <div className="form-row">
                        <div className='form-group'>
                            <label>Number of tickets</label>
                            <Field name="numberOfTickets"> 
                                {({field}) => (
                                    <select {...field} className={"form-control" + (errors.numberOftickets && touched.numberOftickets ? ' is-invalid': '')} onChange={e => onChangeTickets(e, field, values, setValues)}>
                                   <option value=""></option>

                                {[1,2,3,4,5,6,7,8,9,10].map(i => 
                                    <option key={i} value={i}>{i}</option>
                                    )}
                                    </select>
                                )}
                            </Field>
                            <ErrorMessage name='numberOfTickets' component="div" className='invalid-feedbeak'/>
                        </div>
                    </div>
                    </div>
                    <FieldArray name="tickets">
                        {() => (values.tickets.map((ticket, i) => {
                            const ticketErrors = errors.tickets?.length && errors.tickets[i] || {};
                             const ticketTouched = touched.tickets?.length && touched.tickets[i] || {};
                            return(
                                <div key={i} className="list-group list-group-flush">
                                    <div className="list-group-item">
                                        <h5 className="card-title">Ticket {i + 1}</h5>
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label>Name</label>
                                                <Field name={`tickets.${i}.name`} type="text" className={'form-control' + (ticketErrors.name && ticketTouched.name ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`tickets.${i}.name`} component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-6">
                                                <label>Email</label>
                                                <Field name={`tickets.${i}.email`} type="text" className={'form-control' + (ticketErrors.email && ticketTouched.email ? ' is-invalid' : '' )} />
                                                <ErrorMessage name={`tickets.${i}.email`} component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }))}
                    </FieldArray>
                     <div className="card-footer text-center border-top-0">
                            <button type="submit" className="btn btn-primary mr-1">
                                Buy Tickets
                            </button>
                            <button className="btn btn-secondary mr-1" type="reset">Reset</button>
                        </div>
                    </div>
                </Form>
             )}
          </Formik>  
    )
}


