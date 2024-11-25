import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CommunityTC = () => {

    const navigate = useNavigate();


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p>Before you enter this external site,
                you must agree to our terms and conditions.</p>
            <div style={{ marginTop: '20px' }}>
                <button
                    style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => navigate('/Comments')}
                >
                    I agree to the Terms and Conditions
                </button>
            </div>
        </div>
    )
}