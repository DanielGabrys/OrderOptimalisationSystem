class DetailedGrid extends BasicGrid
{
    detailedFields={};

    getDetailedFields(fields,shelfs)
    {
        this.detailedFields = fields;
        this.shelfs=shelfs;
    }

    changeFieldsColorToOrange(counter)
    {
        for(let i=0; i<this.detailedFields.length;i++)
        {
            if(counter===this.detailedFields[i])
            {
                document.getElementById(counter).className="field_cell";
            }
        }

    }

}

detailedGrid = new DetailedGrid();
