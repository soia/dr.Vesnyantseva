import React from 'react';
import PropTypes from 'prop-types';

const ProfileIcon = ({ className }) => (
    <svg
        className={className}
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.49964 8.82413C10.7769 8.82413 12.7888 6.86588 12.9859 4.45855C13.0838 3.24917 12.6684 2.12134 11.816 1.28344C10.9727 0.455782 9.79376 0 8.49964 0C7.19517 0 6.01537 0.453025 5.17807 1.27556C4.33129 2.10716 3.91846 3.23735 4.01336 4.45776C4.20705 6.86549 6.21854 8.82413 8.49964 8.82413Z"
            fill="white"
        />
        <path
            d="M16.9746 16.0039C16.6297 14.0912 15.5529 12.4845 13.8611 11.357C12.3585 10.3557 10.4546 9.8042 8.5 9.8042C6.54541 9.8042 4.6415 10.3557 3.13888 11.3566C1.44706 12.4841 0.370261 14.0908 0.0253586 16.0035C-0.0535114 16.4418 0.0535554 16.8752 0.31918 17.1927C0.439658 17.3373 0.590933 17.4532 0.761957 17.532C0.932982 17.6107 1.11944 17.6503 1.30771 17.6477H15.6923C15.8807 17.6504 16.0673 17.611 16.2384 17.5323C16.4096 17.4537 16.561 17.3377 16.6816 17.1931C16.9464 16.8756 17.0535 16.4422 16.9746 16.0039Z"
            fill="white"
        />
    </svg>
);

ProfileIcon.defaultProps = {
    className: '',
};

ProfileIcon.propTypes = {
    className: PropTypes.string,
};

export default ProfileIcon;
