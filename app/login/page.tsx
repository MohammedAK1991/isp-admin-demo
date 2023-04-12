/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useState } from 'react';
import Image from 'next/image';
import { loginSchema } from './utils';
import useAuth from '../../data/hooks/useAuth';
import ButtonSpinner from '../../components/common/ButtonSpinner';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useAuth();

  return (
    <div className="overflow-hidden bg-white d-flex w-100 h-100">
      <div className="p-4 d-flex align-items-center justify-content-center w-100 h-100 md:w-50 bg-none flex-fill">
        <div className="px-4 py-4 mx-auto bg-white rounded d-flex flex-column align-items-start justify-content-center w-100 h-100 px-md-0 py-md-0 md:w-5/6 lg:w-1/2 shadow-3xl">
          <h1 className="mb-4 h4 fw-bold text-primary md:text-4xl">Welcome Back</h1>
          <h3 className="mb-4 text-gray-500 font-weight-normal text-md">Enter your email and password to sign in</h3>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async ({ email, password }, { setSubmitting }) => {
              setLoading(true);
              const res = await login(email, password);
              if (
                res.detail
              === 'No active account found with the given credentials'
              ) {
                setError(true);
                setMessage(`${res.detail}, please try again`);
                return;
              }
              setSubmitting(false);
              setError(false);
              setMessage(`Welcome ${email}`);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mb-3 text-lg d-flex flex-column align-items-start w-100">
                <div className="mb-3 w-100">
                  <label
                    htmlFor="email"
                    className="form-label fw-bold"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className="bg-gray-200 border-0 rounded form-control border-bottom border-primary"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="form-label fw-bold">
                  <label
                    htmlFor="password"
                    className="bg-gray-200 border-0 rounded form-control border-bottom border-primary"
                  >
                    Password
                  </label>

                  <Field
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    className="text-smd mb-2 w-full rounded border-[1px] border-transparent bg-gray-200 p-4 py-3 focus:border-button focus:outline-none dark:bg-slate-700 dark:text-slate-100"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <button
                  className="w-full p-2 mt-4 font-medium text-white uppercase rounded shrink-0 bg-button hover:bg-opacity-90 md:p-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {loading ? <ButtonSpinner /> : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 bg-backgroundDark d-md-flex d-none flex-fill">
        <Image src="/icon_on_dark.svg" alt="touchstream logo" className="mb-3" width={400} height={400} />
      </div>

      <div className="fixed-bottom w-100">
        <p className="p-2 text-xs text-center text-gray-400 font-semithin">
          ©
          {' '}
          {new Date().getFullYear()}
          , Touchstream. All rights reserved.
        </p>
      </div>

      {/* Error message toast component */}
      {message ? (
        <div
          id="toast-default"
          className="h-auto position-fixed d-flex align-items-center justify-content-center w-100 top-2"
          role="alert"
        >
          <div className="w-auto p-4 bg-white border rounded shadow-sm d-flex flex-nowrap text-black-500">
            <div
              className={`ml-2 text-sm font-normal ${
                error ? 'text-danger' : 'text-success'
              }`}
            >
              {message}
            </div>
            <button
              type="button"
              className="-mx-1.5 -my-1.5 ml-auto d-inline-flex align-items-center justify-content-center h-8 w-8 rounded bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
              data-dismiss-target="#toast-default"
              aria-label="Close"
              onClick={() => setMessage('')}
            >
              <span className="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
}
