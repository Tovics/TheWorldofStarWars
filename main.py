from flask import Flask, render_template, redirect, url_for, jsonify
import os
import psycopg2
import urllib


app = Flask(__name__)

@app.route('/_get_current_user')
def get_current_user():
    return jsonify(username=g.user.username,
                   email=g.user.email,
                   id=g.user.id)


@app.route('/')
def index():
    return redirect(url_for('planets'))


@app.route('/world_of_star_wars')
def planets():
    return render_template('index.html')


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()
