import React from 'react';

export function Home() {
  const labelClasses = 'db pt3 pb2';
  const fieldClasses = 'blue-grey w-100 pv3 ph2 input-reset ba b--grey-light bg-transparent';

  return (
    <div className="pull-center">
      <div
        id="notifications"
        className="bg-white shadow-4 pa4 mb3"
        style={{ marginLeft: '330px', marginRight: '330px' }}
      >
        <h3 className="f3 blue-dark mt0 fw6">LOGIN TO YOUR ACCOUNT :</h3>
        <div className="blue-grey">
          <div className="cf">
            <label className={labelClasses}>
              Don't have an account?
              <strong>
                <span style={{ color: '#7092FF' }}>Contact Admin </span>{' '}
              </strong>
            </label>
          </div>

          <div className="cf">
            <label className={labelClasses}>E-mail Address or Username:</label>

            <input className={fieldClasses} type="text" name="name" />
          </div>
          <div className="cf">
            <label className={labelClasses}>Password:</label>

            <input className={fieldClasses} type="text" name="name" autoComplete="email" />
          </div>
          <div className="cf">
            <button
              className="bg-blue-dark white mh1 mv2"
              style={{
                color: '#fff',
                backgroundColor: '#7092FF',
                borderColor: '#7092FF',
                fontSize: '1rem',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
