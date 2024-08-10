import './TextLoading.css'
import ContentLoader from 'react-content-loader';



const TextLoading = () => {

    return(
        <ContentLoader
              speed={2} // Faster animation
              width="100%" // Adjust width if needed
              height="100%" // Adjust height if needed
              viewBox="0 0 400 50%"
              backgroundColor="#b3b3b3" // Darker grayish background
              foregroundColor="#999999" // Slightly more grayish foreground
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="18%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="36%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="54%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="72%" rx="5" ry="5" width="100%" height="10%" /> 
              <rect x="0" y="90%" rx="5" ry="5" width="100%" height="10%" /> 


            </ContentLoader>
    );

}

export default TextLoading