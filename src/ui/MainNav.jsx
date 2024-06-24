import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { RiCalendarScheduleFill } from "react-icons/ri";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 00;
    padding: 1.2rem 3.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const ScheduleSubMenu = styled.li`
  font-size: 1.5rem;
  padding-left: 3rem;
  cursor: pointer;
`;

const SubMenu = styled.div`
  //animation: fadeInAnimation 2s;
  //animation: 2s slide-up;
  overflow: hidden;
  //overflow-y: visible;
  animation: 2s slide-down;

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  li:hover {
    background-color: #f9fafb;
  }

  //transform: translateY(-100%);
  //transition: 2s ease-in-out;

  //@keyframes fadeInAnimation {
  //  from { opacity: 0; }
  //  to   { opacity: 1; }
  //}
`;

export default function MainNav() {
  const [scheduleMenu, setScheduleMenu] = useState(false);

  const filter = "byclass";

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/students">
            <PiStudentFill />
            Students
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/classes">
            <SiGoogleclassroom />
            Classes
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/teachers">
            <GiTeacher />
            Teachers
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink
            onClick={() => setScheduleMenu(!scheduleMenu)}
            //to="/schedule"
          >
            <RiCalendarScheduleFill />
            Schedule
          </StyledNavLink>
        </li>

        {scheduleMenu && (
          <SubMenu>
            <ScheduleSubMenu>
              <NavLink to="/schedule/byclass">Schedule by Class</NavLink>
            </ScheduleSubMenu>

            <ScheduleSubMenu>
              <NavLink to="/schedule/byteacher">Schedule by Teacher</NavLink>
            </ScheduleSubMenu>
          </SubMenu>
        )}

        <li>
          <StyledNavLink to="/account">
            <HiWrenchScrewdriver />
            Account
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
