
import './recently.scss'

export const Recently = () => {

    return (
        <div className="recently">
            <div className="recently__header">
            <h3>Recently Viewed</h3>
                <div className="recently__header_history">
                    <a id="clear_rvi" href="#">Clear your history</a>
                </div>                            
            </div>
            <div className="recently__items">
            </div>                       
        </div>
    )
}