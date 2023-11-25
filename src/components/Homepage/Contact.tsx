'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Props for the ContactSection component.
 */
interface ContactProps {
  title: string;
  subtitle: string;
}

const Contact = ({ title, subtitle }: ContactProps) => {
  // State for form data.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for form submission status message.
  const [formSubmissionStatus, setFormSubmissionStatus] = useState({
    message: '',
    color: '',
    status: 'not_submitted',
  });

  /**
   * Handles the form submission.
   */
  const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent form from being submitted via redirect.
    event.preventDefault();

    // Set submission status to processing.
    setFormSubmissionStatus({
      message: '',
      color: '',
      status: 'processing_submission',
    });

    // Make sure all values in formData are set and not empty.
    if (formData.name.length <= 0 || formData.email.length <= 0 || formData.message.length <= 0) {
      // Display error message.
      setFormSubmissionStatus({
        message: 'Please fill in all the fields.',
        color: 'text-red-500',
        status: 'not_submitted',
      });
      return;
    }

    // Send form data to Next.js API route.
    const formDataJSON = JSON.stringify(formData);

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formDataJSON,
    };

    const response = await fetch('/api/contact', request);
    const responseBody = await response.json();

    if (!response.ok || responseBody.success !== true) {
      // Display error message.
      if (responseBody.message) {
        // Message returned by API.
        setFormSubmissionStatus({
          message: `${responseBody.message} Code: ${response.status}`,
          color: 'text-red-500',
          status: 'not_submitted',
        });
      } else {
        // No message returned by API, use fallback.
        setFormSubmissionStatus({
          message: `Something went wrong. Please try again later or send an email directly. Code: ${response.status}`,
          color: 'text-red-500',
          status: 'not_submitted',
        });
      }
      return;
    }

    // Success!
    if (responseBody.message) {
      // Display success message by API.
      setFormSubmissionStatus({
        message: responseBody.message,
        color: 'text-green-500',
        status: 'not_submitted',
      });
    } else {
      // Display generic success message.
      setFormSubmissionStatus({
        message: 'Message sent successfully!',
        color: 'text-green-500',
        status: 'not_submitted',
      });
    }

    // Reset form data.
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div
      id="contact-me"
      className={`w-screen mt-24 flex flex-col lg:flex-row container xl:max-w-7xl max-w-5xl mx-auto px-10
        dark:bg-slate-800 bg-slate-100 rounded-lg border border-gray-200 dark:border-slate-500 shadow-sm pb-10`}>
      {/* Responsive wrapper left */}
      <div className="container mx-auto px-0 md:px-16 pt-20 flex flex-col items-center lg:items-start w-full lg:w-5/12">
        {/* Title */}
        <h2 className="text-gray-800 dark:text-slate-100 mb-4 leading-10 text-5xl font-semibold text-center lg:text-start mx-4 sm:mx-0">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <h3 className="text-gray-800 dark:text-slate-200 text-2xl mb-10 mt-3 mx-4 text-center lg:text-start sm:mx-0">{subtitle}</h3>
        )}

        {/* Destination Email */}
        {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
          <div
            className={`w-full hover:bg-slate-300 bg-slate-200 rounded cursor-pointer
                      text-md transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
                      flex flex-row justify-center items-center align-center border border-slate-300 hover:border-slate-600
                      dark:border-slate-500 dark:hover:border-slate-200`}>
            <i className="fa-regular fa-envelope text-2xl ml-5" />
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=Inquiry regarding &body=%0D%0A%0D%0Avia fabiancdng.com`}
              className="font-medium py-4 px-5">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </a>
          </div>
        )}
      </div>

      {/* Responsive wrapper right */}
      <div className="container pt-20 px-0 md:px-20 mx-auto flex flex-col items-center lg:items-start w-full lg:w-7/12">
        <div className="w-full mb-5 mx-auto text-center text-gray-800">
          {/* Text for form submission status */}
          {formSubmissionStatus.message && (
            <p className={`text-start my-4 ${formSubmissionStatus.color}`}>{formSubmissionStatus.message}</p>
          )}

          {/* Form containing input fields */}
          <form onSubmit={handleFormSubmission}>
            {/* Name input */}
            <div className="form-group mb-6">
              <input
                type="text"
                required
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                value={formData.name}
                className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700
                    dark:bg-slate-300 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                id="contact-form-name-input"
                placeholder="Name"
              />
            </div>

            {/* Email input */}
            <div className="form-group mb-6">
              <input
                type="email"
                required
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                value={formData.email}
                className={`form-control block w-full px-3 py-2 text-base font-normal text-gray-700 dark:bg-slate-300 bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none`}
                id="contact-form-email-input"
                placeholder="Email address"
              />
            </div>

            {/* Message textarea */}
            <div className="form-group w-full mb-6">
              <textarea
                w-full="true"
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                value={formData.message}
                required
                className={`form-control block px-3 py-2 w-full text-base font-normal text-black dark:bg-slate-300 dark:focus:bg-slate-300 bg-clip-padding
                  border border-solid border-gray-300 rounded transition ease-in-out m-0
                  focus:bg-white focus:border-blue-600 focus:outline-none`}
                id="contact-form-message-content"
                rows={7}
                placeholder="Message"></textarea>
            </div>

            {/* Data privacy accept checkbox */}
            <div className="mb-6 px-2 flex flex-row items-center">
              <input
                type="checkbox"
                required
                className="border border-solid border-gray-300 rounded transition ease-in-out m-0
                  focus:bg-white focus:border-blue-600 w-6 h-6 focus:outline-none"
                id="contact-form-data-privacy-checkbox"
              />
              <label
                htmlFor="contact-form-data-privacy-checkbox"
                className="ml-3 text-gray-700 dark:text-slate-200 font-medium text-left text-md">
                I accept that my data will be stored and processed in accordance with the{' '}
                <Link href="/privacy-policy" className="underline" target="_blank">
                  data privacy policy
                </Link>
                .
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={formSubmissionStatus.status === 'processing_submission'}
              className={`w-full hover:bg-slate-300 bg-slate-200 rounded cursor-pointer
              text-md mx-auto transition-all duration-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white
              flex flex-row justify-center space-x-3 items-center align-center border border-slate-300 hover:border-slate-600
              dark:border-slate-500 dark:hover:border-slate-200 py-3`}>
              {/* Submission processing */}
              {formSubmissionStatus.status === 'processing_submission' && (
                <>
                  <i className="fa-solid fa-spinner fa-spin" />
                  <p>Processing</p>
                </>
              )}

              {/* Not yet submitted */}
              {formSubmissionStatus.status === 'not_submitted' && (
                <>
                  <i className="fa-regular fa-paper-plane" />
                  <p>Send</p>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
