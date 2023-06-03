import React from 'react'
import AddQuestions from '../AddQuestions'

const Sidebar = () => {



   
   


    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#c2eaed"  }}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Teacher</h5></a></li>
                <li class="nav-item mb-2">


                </li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href='#addQ' > <span className="ml-3">Add Questions</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href='#allQuestions' > <span className="ml-3">All Questions</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#timer"><span className="ml-3">Add Time</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#result"><span className="ml-3">results</span></a></li>

            </ul>
        </div>
    )
}

export default Sidebar