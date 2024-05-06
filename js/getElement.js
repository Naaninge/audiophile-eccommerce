//function to get DOM element and display error if element does not exist
 const getElement = (selection) => {
     const element = document.querySelector(selection)
     
    if (element) {
        return element
    }
    throw new Error(` Element with${selection} not found in DOM`)
};

export default getElement
