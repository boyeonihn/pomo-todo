const deleteText = document.querySelectorAll('.fa-trash')
const minusPomo = document.querySelectorAll('.fa-circle-minus')
const plusPomo = document.querySelectorAll('.fa-circle-plus')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteTodo)
})

Array.from(minusPomo).forEach((element)=>{
    element.addEventListener('click', subPomo)
})

Array.from(plusPomo).forEach((element)=>{
    element.addEventListener('click', addPomo)
})

async function deleteTodo(){
    const taskName = this.parentNode.childNodes[1].innerText
    const pomoGraphic = this.parentNode.childNodes[3].innerText
    const pomoNum = pomoGraphic.length
    try{
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'taskNameS': taskName,
              'pomoPicS': pomoGraphic,
              'pomoNums': pomoNum
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function subPomo(){
    const taskName = this.parentNode.childNodes[1].innerText
    const pomoGraphic = this.parentNode.childNodes[3].innerText
    const pomoNum = pomoGraphic.length
    // const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('subOnePomo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskNameS': taskName,
                'pomoGraphicS': pomoGraphic,
                'pomoNumS': pomoNum
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addPomo(){
    const taskName = this.parentNode.childNodes[1].innerText
    const pomoGraphic = this.parentNode.childNodes[3].innerText
    const pomoNum = pomoGraphic.length
    // const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addCompletedPomo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskNameS': taskName,
                'pomoGraphicS': pomoGraphic,
                'pomoNumS': pomoNum
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}