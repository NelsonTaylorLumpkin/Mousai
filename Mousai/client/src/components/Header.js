import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import { allUsers } from '../modules/userManager';

export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/">Mousai</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem>

                            </>
                        }
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/post">Posts</NavLink>
                            </NavItem>
                        }
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/add">Add Post</NavLink>
                            </NavItem>
                        }
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/edit">Edit Post</NavLink>
                            </NavItem>
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/userprofile">User Profiles</NavLink>
                                </NavItem>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
// import React, { useState } from 'react';
// import { NavLink as RRNavLink } from "react-router-dom";
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink
// } from 'reactstrap';
// import { logout } from '../modules/authManager';
// import { allUsers } from '../modules/userManager';

// export default function Header({ isLoggedIn }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggle = () => setIsOpen(!isOpen);

//     return (
//         <div>
//             <Navbar color="light" light expand="md">
//                 <NavbarBrand tag={RRNavLink} to="/">Mousai</NavbarBrand>
//                 <NavbarToggler onClick={toggle} />
//                 <Collapse isOpen={isOpen} navbar>
//                     <Nav className="mr-auto" navbar>
//                         { /* When isLoggedIn === true, we will render the Home link */}
//                         {isLoggedIn &&
//                             <>
//                                 <NavItem>
//                                     <NavLink tag={RRNavLink} to="/">Home</NavLink>
//                                 </NavItem>

//                             </>
//                         }
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/post">Posts</NavLink>
//                             </NavItem>
//                         }
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/add">Add Post</NavLink>
//                             </NavItem>
//                         }
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/edit/{id}">Edit Post</NavLink>
//                             </NavItem>
//                         }
//                     </Nav>
//                     <Nav navbar>
//                         {isLoggedIn &&
//                             <>
//                                 <NavItem>
//                                     <NavLink tag={RRNavLink} to="/userprofile">User Profiles</NavLink>
//                                 </NavItem>
//                                 <NavItem>
//                                     <a aria-current="page" className="nav-link"
//                                         style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
//                                 </NavItem>
//                             </>
//                         }
//                         {!isLoggedIn &&
//                             <>
//                                 <NavItem>
//                                     <NavLink tag={RRNavLink} to="/login">Login</NavLink>
//                                 </NavItem>
//                                 <NavItem>
//                                     <NavLink tag={RRNavLink} to="/register">Register</NavLink>
//                                 </NavItem>
//                             </>
//                         }
//                     </Nav>
//                 </Collapse>
//             </Navbar>
//         </div>
//     );
// }