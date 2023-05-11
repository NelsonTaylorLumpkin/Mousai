import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { logout } from '../modules/authManager';

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
                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/">Home</NavLink>
                            </NavItem>
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
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Actions
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem tag={RRNavLink} to="/edit">
                                        Edit Post
                                    </DropdownItem>
                                    <DropdownItem tag={RRNavLink} to="/mypostlist">
                                        My Posts
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={logout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
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
//     NavLink,
//     UncontrolledDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem
// } from 'reactstrap';
// import { logout } from '../modules/authManager';

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
//                         {isLoggedIn &&
//                             <NavItem>
//                                 <NavLink tag={RRNavLink} to="/">Home</NavLink>
//                             </NavItem>
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
//                     </Nav>
//                     <Nav navbar>
//                         {isLoggedIn &&
//                             <UncontrolledDropdown nav inNavbar>
//                                 <DropdownToggle nav caret>
//                                     Actions
//                                 </DropdownToggle>
//                                 <DropdownMenu right>
//                                     <DropdownItem tag={RRNavLink} to="/edit">
//                                         Edit Post
//                                     </DropdownItem>
//                                     <DropdownItem tag={RRNavLink} to="/myposts">
//                                         My Posts
//                                     </DropdownItem>
//                                     <DropdownItem divider />
//                                     <DropdownItem onClick={logout}>
//                                         Logout
//                                     </DropdownItem>
//                                 </DropdownMenu>
//                             </UncontrolledDropdown>
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
