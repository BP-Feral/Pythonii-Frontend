export default function Hamburger({ isOpen }){
    return(
        <>
            <div className="hamburger">
                <div className="burger burger1" />
                <div className="burger burger2" />
                <div className="burger burger3" />
            </div>
            
            <style jsx>{`
                
                .hamburger {
                    width: 2rem;
                    height: 2.5rem;
                    display: flex;
                    justify-content: space-around;
                    flex-flow: column nowrap;
                    display:fixed;
                    padding-top: 7px;
                    margin-left: 10px;
                    z-index: 10;
                }

                .burger1 {
                    transform: ${ isOpen ? 'rotate(45deg)' : 'rotate(0)'};
                    }
                .burger2 {
                    transform: ${ isOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${ isOpen ? 0 : 1};
                }
                .burger3 {
                    transform: ${ isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
                }
            `}</style>
        </>
    )
}