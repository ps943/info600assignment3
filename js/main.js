document.addEventListener('DOMContentLoaded', assignClickHandler)

// adding Ajax method to the existing function on clicking Add rec button
function assignClickHandler()
          {
              document.getElementById('addRec').addEventListener('click', function()
                {

                  const startYear = document.getElementById('startYear').value
                  if (startYear < 2000) {
                    window.alert('Incorrect year: ' + startYear)
                    return }
// Using "POST" method to post the data to the /users URL 
                    $.ajax({
  				                    method: 'POST',
  				                    url: '/users',
  				                    type: 'POST',
  				                    data: {fullName:$('#fullName').val(),major:$('#major').val(),startYear: $('#startYear').val()
                            }
                          });
                            document.getElementById('inputs').reset()   // Using reset to reset the input fields after pressing add record button.
	                }
      );

// Adding ajax GET method on Clicking Load button

        document.getElementById('loaddata').addEventListener('click', function()
          {
              document.getElementById('enteredRecords').innerHTML= " "; // Clearing out enteredRecords div on clicking again so that same records are not appended in the div
              $.ajax({
                    method: 'GET',
                    url: '/users',
                    type: 'get',
                    success: function perform_load_data(allFields)
                    {
                      $(allFields.records).each(function(i,j) // For each id (j) , iterating i times
                      {
                        const date = new Date()
                        const hours = date.getHours().toString().padStart(2, '0')
                        const minutes = date.getMinutes().toString().padStart(2, '0')
                        const time = hours + ':' + minutes
                        const id = j.id;
                     $('#enteredRecords').append(time +' - '+ j.fullName+', '+' '+j.major+', '+j.startYear+ '<button value="'+j.id+'" id="DeleteButton"> Delete </button><br>');
                     });
                  }
      }); });


      $(document).on("click","#DeleteButton", function deleteData()
                    {
                      const id = $(this).val();

                      $.ajax
                      ({
                        url: '/user/'+id,
                        method: 'DELETE',
                      });

                      alert("Record deleted successfully");

                      document.getElementById('enteredRecords').innerHTML= " ";  // Refreshing/ reloading the div .

                      $.ajax({
                                method: 'GET',
                                url: '/users',
                                type: 'get',
                                success: function perform_get_data(data){
                    $(data.records).each(function(i,j){                           // Calling load function again to show updated values.
                    const id = j.id;
                    const date = new Date()
                    const hours = date.getHours().toString().padStart(2, '0')
                    const minutes = date.getMinutes().toString().padStart(2, '0')
                    const time = hours + ':' + minutes
                    $('#enteredRecords').append(time +' - '+ j.fullName+', '+' '+j.major+', '+j.startYear+ '<button value="'+j.id+'" id="DeleteButton"> Delete </button><br>');
                    });
                    }
                    });
                    });

      }
