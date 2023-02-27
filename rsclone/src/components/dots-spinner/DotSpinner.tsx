import '../dots-spinner/dotsSpinner.scss';

interface IDotsSpinnerParams {
  theme: 'dark' | 'light',
  size: 'big' | 'small'
}

export const DotSpinner = (params: IDotsSpinnerParams) => {
  return (
    <div className='dots-spinner-wrapper'>
      <div className={`dots-spinner
        ${params.theme === 'light' ? 'dots-spinner-light' : 'dots-spinner-dark'}
        ${params.size === 'big' ? 'dots-spinner-big' : 'dots-spinner-small'}`
      }>
      <div className="dots-spinner-step1"></div>
      <div className="dots-spinner-step2"></div>
      <div className="dots-spinner-step3"></div>
    </div>
    </div>
    
  )
}
