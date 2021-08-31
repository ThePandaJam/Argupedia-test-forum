const themeFile = ({
    palette: {
      primary: {
        light: '#7f47ed',
        main: '#5E17EB',
        dark: '#3e0aa6',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7f30',
        main: '#f0610a4',
        dark: '#c9550e',
        contrastText: '#fff',
      },
    },
    typography: {
      useNextVariants: true,
    },
    loginSignupStyle: {
      form: {
        textAlign: 'center'
      },
      image: {
          margin: '20px auto 20px auto',
          width: '20%'  
      },
      pageTitle: {
          margin: '40px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          marginTop: 20,
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem',
          marginTop: 10
      },
      progress: {
          position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: 20
      },
      card: {
        display: 'flex',
        marginBottom: 20,
      },
      cardContent : {
          width: '100%',
          flexDirection: 'column',
          padding: 25
      },
      cover: {
          minWidth: 200,
          objectFit: 'cover'
      },
      handle: {
          width: 60,
          height: 20,
          backgroundColor: '#3e0aa6',
          marginBottom: 7
      },
      date: {
          width: 100,
          height: 14,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          marginBottom: 10
      },
      fullLine: {
          height: 15,
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          marginBottom: 10
      },
      halfLine: {
          height: 15,
          width: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          marginBottom: 10
      },
      paper: {
        padding: 20
      },
      profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#3e0aa6'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
    },
  })

  export default themeFile