import { useMutation } from "@apollo/client"
import { useState } from "react"
import { FaUser } from "react-icons/fa"
import { AddClient } from "../mutations/clientMutations"
import { GetClients } from "../queries/clientQueries"

export default function AddClientModal() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [addClient] = useMutation(AddClient, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GetClients })

      cache.writeQuery({
        query: GetClients,
        data: { clients: [...clients, addClient] },
      })
    },
  })

  const onSubmitClient = (e) => {
    e.preventDefault()

    if (name == "" || email == "" || phone == "") {
      return alert("tolong isi dulu guys")
    }

    addClient(name, email, phone)

    setName("")
    setEmail("")
    setPhone("")
  }

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitClient}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={name}
                    onInput={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onInput={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={phone}
                    onInput={(e) => {
                      setPhone(e.target.value)
                    }}
                  />
                </div>
                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
