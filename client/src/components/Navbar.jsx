import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoImg from '../utils/Images/Logo1.png';
import { Link as LinkR, NavLink, Link } from 'react-router-dom';
import { MenuRounded, Search } from '@mui/icons-material';
import { Avatar, Button, Menu, MenuItem, Typography, Switch, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/reducers/userSlice'; // Adjust the import according to your file structure
import axios from 'axios'; // Assuming you're using axios for API calls

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
  height: 52px;
`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;

const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 90%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  z-index: ${({ isOpen }) => (isOpen ? '1000' : '-1000')};
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px 20px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg_secondary};
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.bg};
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: 10px 40px 10px 16px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.text_primary};
  background-color: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  width: 300px;
  transition: background-color 0.3s ease, color 0.3s ease;
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const ModeSwitch = styled.div`
  display: flex;
  align-items: center;
`;

const ModeLabel = styled.span`
  color: ${({ theme }) => theme.text_primary};
  margin-right: 8px;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const currentUser = useSelector((state) => state.user); // Adjust according to your state structure

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
}, []);


const handleClick = (event) => {
setAnchorEl(event.currentTarget);
};

const handleClose = () => {
setAnchorEl(null);
};

const handleLogout = () => {
dispatch(logout());
handleClose();
};

const handleSearch = (query) => {
// Handle search functionality
console.log('Searching for:', query);
};

const handleModeChange = () => {
// Handle dark/light mode change
console.log('Mode changed');
};

return (
<Nav>
<NavContainer>
<Mobileicon onClick={() => setIsOpen(!isOpen)}>
<MenuRounded sx={{ color: 'inherit' }} />
</Mobileicon>
<NavLogo to="/">
<Logo src={LogoImg} />
Vidhyalaya
</NavLogo>     <MobileMenu isOpen={isOpen}>
      <Navlink to="/">Home</Navlink>
      <Navlink to="/about">About</Navlink>
      <Navlink to="/compare">Compare</Navlink>
      <Navlink to="/blogs">Blogs</Navlink>
      <Navlink to="/chat">Chat</Navlink>
    </MobileMenu>

    <NavItems>
      <Navlink to="/">Home</Navlink>
      <Navlink to="/about">About</Navlink>
      <Navlink to="/compare">Compare</Navlink>
      <Navlink to="/blogs">Blogs</Navlink>
      <Navlink to="/chat">Chat</Navlink>
    </NavItems>

    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchButton>
        <Search />
      </SearchButton>
    </SearchContainer>

    <UserContainer>
      <ModeSwitch>
        <ModeLabel>Dark Mode</ModeLabel>
        <Switch onChange={handleModeChange} />
      </ModeSwitch>
      <Button onClick={handleClick}>
        <Avatar src={currentUser?.img}>
          {currentUser?.name ? currentUser.name[0] : ''}
        </Avatar>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box px={2} py={1}>
          <Typography variant="body1">{userData?.email}</Typography>
          <Typography variant="body1">{userData?.name}</Typography>
        </Box>
        <MenuItem onClick={handleClose}>
          <StyledLink to="/profile">My Profile</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StyledLink to="/entrance">Entrance</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </UserContainer>
  </NavContainer>
</Nav>
)};

export default Navbar;