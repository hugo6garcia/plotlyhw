function barChart(id) {
    d3.json("samples.json").then((data) =>{
        console.log(data)
        var samples = data.samples
        var resultArray = samples.filter(row => row.id == id)
        var result = resultArray[0]
        var otu_ids = result.otu_ids.map(id => "OTU" + id)
        var otu_labels = result.otu_labels
        var sample_values = result.sample_values

        var otu_labels_10 = otu_labels.slice(0, 10)
        var value_10 = sample_values.slice(0, 10)
        var trace = [{
            x: value_10,
            y: otu_ids,
            text: otu_labels_10,
            type: "bar",
            orientation: "h",
            marker: {
                color: "orange"
            }
        }]
        var bar_layout = {
            title: "Top 10 microbial species (OTUs)"
        }
        Plotly.newPlot("bar", trace, bar_layout)
        
    }
    )
}
barChart(940)

function bubbleChart(id) {
    d3.json("samples.json").then((data) =>{
        var samples = data.samples
        var resultArray = samples.filter(row => row.id == id)
        var result = resultArray[0]
        var otu_ids = result.otu_ids
        var sample_values = result.sample_values
        var otu_labels = result.otu_labels
        var trace = [{
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            text: otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Portland",
                sizeref: 1.5
            }
        }]

        Plotly.newPlot("bubble", trace)
    }

    )
}
bubbleChart(940)

function Metadata(id) {
    const displayMetadata = d3.select("#sample-metadata");
    displayMetadata.html("")
    d3.json("samples.json").then((data) => {
        var result = data.metadata.filter(row => row.id == id)
        Object.entries(result[0]).forEach(([key, value]) => {
            displayMetadata.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })
    })
}
Metadata(940)
function init() {
    var selectID = d3.select("#selDataset");
    d3.json("samples.json").then((data) =>{
        var id_number = data.names
        id_number.forEach(id => {
            selectID.append("option").text(id)
            
        }
        )
        barChart();
        bubbleChart();
    })
}

function IDchange() {
    d3.json("samples.json").then((data) =>{
    const selectMenu = d3.select("#selDataset");
    var id = selectMenu.property("value");
    var index = data.names.indexOf(id)
    barChart(id)
    bubbleChart(id)
    Metadata(id)
    }

    )
    
}
d3.select("#selDataset").on("change", IDchange);


init()
